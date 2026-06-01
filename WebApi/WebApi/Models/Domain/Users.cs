using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Domain
{
    public class Users
    {
        [Key]
        public Guid Id { get; set; }

        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }

        public string? Avatar { get; set; }
        public string? Phone { get; set; }

        public string Role { get; set; } = "User"; // User or Admin

        public bool IsBlocked { get; set; }

        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }

        public List<Address> Addresses { get; set; } = new List<Address>();
        public List<Order> Orders { get; set; } = new List<Order>();
        public List<Notification> Notifications { get; set; } = new List<Notification>();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
