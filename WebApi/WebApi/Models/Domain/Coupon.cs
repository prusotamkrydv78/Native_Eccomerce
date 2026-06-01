using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Domain
{
    public class Coupon
    {
        [Key]
        public Guid Id { get; set; }

        public string Code { get; set; } = string.Empty;
        public string Type { get; set; } = "percentage"; // percentage or fixed
        public decimal Value { get; set; }
        public decimal? MaxDiscount { get; set; }

        public decimal MinOrderAmount { get; set; }

        public int? UsageLimit { get; set; }
        public int UsageCount { get; set; }

        public bool IsActive { get; set; }
        public DateTime? ExpiryDate { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
