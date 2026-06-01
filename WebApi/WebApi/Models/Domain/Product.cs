using System.ComponentModel.DataAnnotations;
using WebApi.Models.Domain;

public class Product
{
    [Key]
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int Price { get; set; }

    public string? Image { get; set; }

    public string? Brand { get; set; }

    public int TotalStock { get; set; }

    public string? Seller { get; set; }

    public bool IsPublished { get; set; }

    public double Rating { get; set; }

    public string? Specifications { get; set; }

    public Guid UserId { get; set; }

    public Users User { get; set; }

    public ICollection<Review> Reviews { get; set; }
        = new List<Review>();

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}