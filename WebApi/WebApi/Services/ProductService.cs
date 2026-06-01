using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models.Domain;
using WebApi.Models.DTOs;

namespace WebApi.Services
{
    public interface IProductService
    {
        Task<(List<ProductDto> products, int total)> GetProductsAsync(int pageNumber = 1, int pageSize = 12, string? keyword = null, Guid? categoryId = null);
        Task<ProductDto> GetProductByIdAsync(Guid id);
        Task<ProductDto> CreateProductAsync(CreateProductDto createProductDto);
        Task<ProductDto> UpdateProductAsync(Guid id, UpdateProductDto updateProductDto);
        Task DeleteProductAsync(Guid id);
        Task AddReviewAsync(Guid productId, Guid userId, CreateReviewDto reviewDto);
    }

    public class ProductService : IProductService
    {
        private readonly NativeDbContext _context;

        public ProductService(NativeDbContext context)
        {
            _context = context;
        }

        public async Task<(List<ProductDto> products, int total)> GetProductsAsync(int pageNumber = 1, int pageSize = 12, string? keyword = null, Guid? categoryId = null)
        {
            var query = _context.Products.Where(p => p.IsPublished);

            if (!string.IsNullOrEmpty(keyword))
                query = query.Where(p => p.Name.Contains(keyword) || p.Description.Contains(keyword));

            if (categoryId.HasValue)
                query = query.Where(p => p.CategoryId == categoryId.Value);

            var total = await query.CountAsync();
            var products = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Include(p => p.Category)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    BasePrice = p.BasePrice,
                    DiscountPrice = p.DiscountPrice,
                    Images = p.Images,
                    Brand = p.Brand,
                    Stock = p.Stock,
                    CategoryId = p.CategoryId,
                    Rating = p.Rating,
                    ReviewCount = p.ReviewCount,
                    IsPublished = p.IsPublished,
                    CreatedAt = p.CreatedAt
                })
                .ToListAsync();

            return (products, total);
        }

        public async Task<ProductDto> GetProductByIdAsync(Guid id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Reviews)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                throw new Exception("Product not found");

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                BasePrice = product.BasePrice,
                DiscountPrice = product.DiscountPrice,
                Images = product.Images,
                Brand = product.Brand,
                Stock = product.Stock,
                CategoryId = product.CategoryId,
                Rating = product.Rating,
                ReviewCount = product.ReviewCount,
                IsPublished = product.IsPublished,
                CreatedAt = product.CreatedAt
            };
        }

        public async Task<ProductDto> CreateProductAsync(CreateProductDto createProductDto)
        {
            var categoryExists = await _context.Categories.AnyAsync(c => c.Id == createProductDto.CategoryId);
            if (!categoryExists)
                throw new Exception("Category not found");

            var product = new Product
            {
                Name = createProductDto.Name,
                Slug = createProductDto.Name.ToLower().Replace(" ", "-"),
                Description = createProductDto.Description,
                BasePrice = createProductDto.BasePrice,
                DiscountPrice = createProductDto.DiscountPrice,
                Images = createProductDto.Images,
                Brand = createProductDto.Brand,
                Stock = createProductDto.Stock,
                CategoryId = createProductDto.CategoryId,
                Tags = createProductDto.Tags,
                SpecificationsJson = createProductDto.SpecificationsJson,
                VariantsJson = createProductDto.VariantsJson,
                IsPublished = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                BasePrice = product.BasePrice,
                DiscountPrice = product.DiscountPrice,
                Images = product.Images,
                Brand = product.Brand,
                Stock = product.Stock,
                CategoryId = product.CategoryId,
                Rating = product.Rating,
                ReviewCount = product.ReviewCount,
                IsPublished = product.IsPublished,
                CreatedAt = product.CreatedAt
            };
        }

        public async Task<ProductDto> UpdateProductAsync(Guid id, UpdateProductDto updateProductDto)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                throw new Exception("Product not found");

            if (updateProductDto.CategoryId.HasValue)
            {
                var categoryExists = await _context.Categories.AnyAsync(c => c.Id == updateProductDto.CategoryId.Value);
                if (!categoryExists)
                    throw new Exception("Category not found");
                product.CategoryId = updateProductDto.CategoryId.Value;
            }

            if (!string.IsNullOrEmpty(updateProductDto.Name))
            {
                product.Name = updateProductDto.Name;
                product.Slug = updateProductDto.Name.ToLower().Replace(" ", "-");
            }

            if (!string.IsNullOrEmpty(updateProductDto.Description))
                product.Description = updateProductDto.Description;

            if (updateProductDto.BasePrice.HasValue)
                product.BasePrice = updateProductDto.BasePrice.Value;

            if (updateProductDto.DiscountPrice.HasValue)
                product.DiscountPrice = updateProductDto.DiscountPrice.Value;

            if (updateProductDto.Images != null)
                product.Images = updateProductDto.Images;

            if (!string.IsNullOrEmpty(updateProductDto.Brand))
                product.Brand = updateProductDto.Brand;

            if (updateProductDto.Stock.HasValue)
                product.Stock = updateProductDto.Stock.Value;

            if (updateProductDto.Tags != null)
                product.Tags = updateProductDto.Tags;

            if (updateProductDto.IsPublished.HasValue)
                product.IsPublished = updateProductDto.IsPublished.Value;

            product.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                BasePrice = product.BasePrice,
                DiscountPrice = product.DiscountPrice,
                Images = product.Images,
                Brand = product.Brand,
                Stock = product.Stock,
                CategoryId = product.CategoryId,
                Rating = product.Rating,
                ReviewCount = product.ReviewCount,
                IsPublished = product.IsPublished,
                CreatedAt = product.CreatedAt
            };
        }

        public async Task DeleteProductAsync(Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                throw new Exception("Product not found");

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }

        public async Task AddReviewAsync(Guid productId, Guid userId, CreateReviewDto reviewDto)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
                throw new Exception("Product not found");

            var review = new Review
            {
                ProductId = productId,
                UserId = userId,
                Rating = reviewDto.Rating,
                Comment = reviewDto.Comment ?? "",
                CreatedAt = DateTime.UtcNow
            };

            _context.Reviews.Add(review);

            // Update product rating
            product.ReviewCount++;
            var avgRating = await _context.Reviews
                .Where(r => r.ProductId == productId)
                .AverageAsync(r => r.Rating);
            product.Rating = avgRating;

            await _context.SaveChangesAsync();
        }
    }
}
