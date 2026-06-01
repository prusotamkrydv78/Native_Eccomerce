using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Domain
{
    public class Category
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string? Image { get; set; }
        public string? Description { get; set; }

        public Guid? ParentCategoryId { get; set; }
        public Category? ParentCategory { get; set; }

        public List<Product> Products { get; set; } = new List<Product>();
        public List<Category> SubCategories { get; set; } = new List<Category>();

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}