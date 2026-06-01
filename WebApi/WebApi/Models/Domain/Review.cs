using System.ComponentModel.DataAnnotations;
using WebApi.Models.Domain;

public class Review
{
    [Key]
    public Guid Id { get; set; }

    public Guid UserId { get; set; }
    public Users User { get; set; }

    public Guid ProductId { get; set; }
    public Product Product { get; set; }

    public int Rating { get; set; }

    public string Comment { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}