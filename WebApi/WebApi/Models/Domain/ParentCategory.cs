using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Domain
{
    public class ParentCategory
    {
        [Key]
        public Guid Id { set; get; }

        public required string Name { get; set; }

        public string ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
