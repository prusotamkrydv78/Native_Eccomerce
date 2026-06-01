using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Domain
{
    public class Address
    {
        [Key]
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public Users User { get; set; }

        public string FullName { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        public bool IsDefault { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
