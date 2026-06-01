using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Domain
{
    public class Notification
    {
        [Key]
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public Users User { get; set; }

        public string Type { get; set; } = string.Empty; // order_placed, order_shipped, order_delivered, payment_received, review_reply
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string DataJson { get; set; } = string.Empty; // Store additional data as JSON

        public bool Read { get; set; }
        public DateTime ReadAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
