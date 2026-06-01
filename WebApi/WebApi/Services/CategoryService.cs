using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models.Domain;
using WebApi.Models.DTOs;

namespace WebApi.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetCategoriesAsync();
        Task<CategoryDto> GetCategoryByIdAsync(Guid id);
        Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto createCategoryDto);
        Task<CategoryDto> UpdateCategoryAsync(Guid id, UpdateCategoryDto updateCategoryDto);
        Task DeleteCategoryAsync(Guid id);
    }

    public class CategoryService : ICategoryService
    {
        private readonly NativeDbContext _context;

        public CategoryService(NativeDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoryDto>> GetCategoriesAsync()
        {
            var categories = await _context.Categories
                .Where(c => c.IsActive)
                .Include(c => c.SubCategories)
                .ToListAsync();

            return categories.Select(c => MapToCategoryDto(c)).ToList();
        }

        public async Task<CategoryDto> GetCategoryByIdAsync(Guid id)
        {
            var category = await _context.Categories
                .Include(c => c.SubCategories)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                throw new Exception("Category not found");

            return MapToCategoryDto(category);
        }

        public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto createCategoryDto)
        {
            var category = new Category
            {
                Name = createCategoryDto.Name,
                Slug = createCategoryDto.Name.ToLower().Replace(" ", "-"),
                Image = createCategoryDto.Image,
                Description = createCategoryDto.Description,
                ParentCategoryId = createCategoryDto.ParentCategoryId,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return MapToCategoryDto(category);
        }

        public async Task<CategoryDto> UpdateCategoryAsync(Guid id, UpdateCategoryDto updateCategoryDto)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                throw new Exception("Category not found");

            if (!string.IsNullOrEmpty(updateCategoryDto.Name))
            {
                category.Name = updateCategoryDto.Name;
                category.Slug = updateCategoryDto.Name.ToLower().Replace(" ", "-");
            }

            if (!string.IsNullOrEmpty(updateCategoryDto.Image))
                category.Image = updateCategoryDto.Image;

            if (!string.IsNullOrEmpty(updateCategoryDto.Description))
                category.Description = updateCategoryDto.Description;

            if (updateCategoryDto.ParentCategoryId.HasValue)
                category.ParentCategoryId = updateCategoryDto.ParentCategoryId.Value;

            if (updateCategoryDto.IsActive.HasValue)
                category.IsActive = updateCategoryDto.IsActive.Value;

            category.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return MapToCategoryDto(category);
        }

        public async Task DeleteCategoryAsync(Guid id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                throw new Exception("Category not found");

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }

        private CategoryDto MapToCategoryDto(Category category)
        {
            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Slug = category.Slug,
                Image = category.Image,
                Description = category.Description,
                ParentCategoryId = category.ParentCategoryId,
                IsActive = category.IsActive,
                CreatedAt = category.CreatedAt
            };
        }
    }
}
