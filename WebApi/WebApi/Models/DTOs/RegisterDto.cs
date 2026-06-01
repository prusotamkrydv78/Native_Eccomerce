using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.DTOs
{
    public class RegisterDto
    {
        [Key]
        public Guid Id = Guid.NewGuid();
        public required string FullName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
