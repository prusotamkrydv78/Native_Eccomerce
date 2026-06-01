using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Domain
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public Users User { get; set; }

        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        public string ShippingAddressJson { get; set; } = string.Empty;

        public string PaymentMethod { get; set; } = string.Empty; // card, cash, etc.

        public decimal SubTotal { get; set; }
        public decimal Tax { get; set; }
        public decimal Shipping { get; set; }
        public decimal Discount { get; set; }
        public decimal TotalPrice { get; set; }

        public string CouponCode { get; set; } = string.Empty;

        public string Status { get; set; } = "pending"; // pending, processing, shipped, delivered, cancelled
        
        public bool IsPaid { get; set; }
        public DateTime? PaidAt { get; set; }

        public bool IsDelivered { get; set; }
        public DateTime? DeliveredAt { get; set; }

        public string TrackingNumber { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class OrderItem
    {
        [Key]
        public Guid Id { get; set; }

        public Guid OrderId { get; set; }
        public Order Order { get; set; }

        public Guid ProductId { get; set; }
        public Product Product { get; set; }

        public string ProductName { get; set; } = string.Empty;
        public decimal BasePrice { get; set; }
        public int Quantity { get; set; }
        public string VariantJson { get; set; } = string.Empty;

        public decimal TotalPrice => BasePrice * Quantity;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class OrderTracking
    {
        [Key]
        public Guid Id { get; set; }

        public Guid OrderId { get; set; }
        public Order Order { get; set; }

        public string Status { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public bool Completed { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
