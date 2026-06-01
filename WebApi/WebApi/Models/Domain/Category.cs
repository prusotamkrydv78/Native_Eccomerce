using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Domain
{
    public class Category
    {
        [Key]
        public Guid Id { get; set; }

        public required string Name { get; set; }

        public string? Image { get; set; }

        public required string Description { get; set; }

        public Guid ParentCategoryId { get; set; }

        public ParentCategory ParentCategory { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}