using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Domain
{
    public class Wishlist
    {
        [Key]
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public Users User { get; set; }

        public Guid ProductId { get; set; }
        public Product Product { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}