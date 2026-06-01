using System.Security.Cryptography;
using System.Text;

namespace WebApi.Utils
{
    public static class PasswordHasherUtil
    {
        private const int SaltSize = 16; // 128 bit 
        private const int KeySize = 32; // 256 bit
        private const int Iterations = 10000;
        private static readonly HashAlgorithmName Algorithm = HashAlgorithmName.SHA256;
        private const char Separator = ';';

        public static string HashPassword(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(SaltSize);
            var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, KeySize);
            return string.Join(Separator, Convert.ToBase64String(salt), Convert.ToBase64String(hash));
        }

        public static bool VerifyPassword(string passwordHash, string inputPassword)
        {
            try
            {
                var elements = passwordHash.Split(Separator);
                var salt = Convert.FromBase64String(elements[0]);
                var hash = Convert.FromBase64String(elements[1]);
                var hashInput = Rfc2898DeriveBytes.Pbkdf2(inputPassword, salt, Iterations, Algorithm, KeySize);
                return CryptographicOperations.FixedTimeEquals(hash, hashInput);
            }
            catch
            {
                return false;
            }
        }
    }
}
