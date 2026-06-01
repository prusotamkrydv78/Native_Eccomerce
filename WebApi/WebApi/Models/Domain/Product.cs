using System.ComponentModel.DataAnnotations;
using WebApi.Models.Domain;

public class Product
{
    [Key]
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;

    public decimal BasePrice { get; set; }
    public decimal? DiscountPrice { get; set; }

    public List<string> Images { get; set; } = new List<string>();

    public string? Brand { get; set; }

    public int Stock { get; set; }

    public Guid CategoryId { get; set; }
    public Category Category { get; set; }

    public List<string> Tags { get; set; } = new List<string>();
    public string? SpecificationsJson { get; set; }
    public string? VariantsJson { get; set; }

    public double Rating { get; set; }
    public int ReviewCount { get; set; }

    public List<Review> Reviews { get; set; } = new List<Review>();

    public bool IsPublished { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}