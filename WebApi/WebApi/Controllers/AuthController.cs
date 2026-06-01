using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Models.Domain;
using WebApi.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
     public class AuthController : ControllerBase

    {
        private readonly NativeDbContext nativeDbContext;

        public AuthController(NativeDbContext nativeDbContext)
        {
            this.nativeDbContext = nativeDbContext;
        }




        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterDto registerDto)
        {
            try
            {

            var isUserExist = await nativeDbContext.Users
    .AnyAsync(u => u.Email == registerDto.Email);

            if (isUserExist)
                return Conflict(new { message = "User already exists" });

            var newUser = new Users
            {
                FullName = registerDto.FullName,
                Email = registerDto.Email,
                Password = PasswordHasherUtil.HashPassword(registerDto.Password)
            };

            nativeDbContext.Users.Add(newUser);
            await nativeDbContext.SaveChangesAsync();

            return Ok(new
            {
                message = "User registered successfully",
                data = new
                {
                    newUser.Id,
                    newUser.FullName,
                    newUser.Email
                }
            });
            }
            catch (DbUpdateException ex)
            {
                var message = ex.InnerException?.Message;
                return BadRequest(message);
            }

        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var isUserExist = await nativeDbContext.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (isUserExist == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            var isPasswordCorrect = PasswordHasherUtil.VerifyPassword(
                isUserExist.Password,
                loginDto.Password
            );

            if (!isPasswordCorrect)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }
            return Ok(new { message = "Login sucessful", data = new { fullName = isUserExist.FullName, email = isUserExist.Email } });

        }

        public static class PasswordHasherUtil
        {
            private static readonly PasswordHasher<object> hasher = new();

            // Hash password
            public static string HashPassword(string password)
            {
                return hasher.HashPassword(null, password);
            }

            // Verify password
            public static bool VerifyPassword(string hashedPassword, string password)
            {
                var result = hasher.VerifyHashedPassword(null, hashedPassword, password);
                return result == PasswordVerificationResult.Success;
            }
        }

    }
}
