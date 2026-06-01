using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models.Domain;
using WebApi.Models.DTOs;

namespace WebApi.Services
{
    public interface ICartService
    {
        Task<CartDto> GetCartAsync(Guid userId);
        Task<CartDto> AddToCartAsync(Guid userId, CreateCartItemDto createCartItemDto);
        Task<CartDto> UpdateCartItemAsync(Guid userId, Guid itemId, UpdateCartItemDto updateCartItemDto);
        Task<CartDto> RemoveFromCartAsync(Guid userId, Guid itemId);
        Task ClearCartAsync(Guid userId);
    }

    public class CartService : ICartService
    {
        private readonly NativeDbContext _context;

        public CartService(NativeDbContext context)
        {
            _context = context;
        }

        public async Task<CartDto> GetCartAsync(Guid userId)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
                throw new Exception("Cart not found");

            return MapToCartDto(cart);
        }

        public async Task<CartDto> AddToCartAsync(Guid userId, CreateCartItemDto createCartItemDto)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
                throw new Exception("Cart not found");

            var product = await _context.Products.FindAsync(createCartItemDto.ProductId);
            if (product == null)
                throw new Exception("Product not found");

            var existingItem = cart.Items.FirstOrDefault(i => i.ProductId == createCartItemDto.ProductId);
            if (existingItem != null)
            {
                existingItem.Quantity += createCartItemDto.Quantity;
            }
            else
            {
                cart.Items.Add(new CartItem
                {
                    ProductId = createCartItemDto.ProductId,
                    Quantity = createCartItemDto.Quantity,
                    VariantJson = createCartItemDto.VariantJson
                });
            }

            await _context.SaveChangesAsync();
            return MapToCartDto(cart);
        }

        public async Task<CartDto> UpdateCartItemAsync(Guid userId, Guid itemId, UpdateCartItemDto updateCartItemDto)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
                throw new Exception("Cart not found");

            var item = cart.Items.FirstOrDefault(i => i.Id == itemId);
            if (item == null)
                throw new Exception("Cart item not found");

            item.Quantity = updateCartItemDto.Quantity;
            await _context.SaveChangesAsync();

            return MapToCartDto(cart);
        }

        public async Task<CartDto> RemoveFromCartAsync(Guid userId, Guid itemId)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
                throw new Exception("Cart not found");

            var item = cart.Items.FirstOrDefault(i => i.Id == itemId);
            if (item == null)
                throw new Exception("Cart item not found");

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();

            return MapToCartDto(cart);
        }

        public async Task ClearCartAsync(Guid userId)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
                throw new Exception("Cart not found");

            _context.CartItems.RemoveRange(cart.Items);
            await _context.SaveChangesAsync();
        }

        private CartDto MapToCartDto(Cart cart)
        {
            var items = cart.Items.Select(ci => new CartItemDto
            {
                Id = ci.Id,
                ProductId = ci.ProductId,
                ProductName = ci.Product?.Name ?? "",
                ProductPrice = ci.Product?.BasePrice ?? 0,
                ProductImage = ci.Product?.Images.FirstOrDefault(),
                Quantity = ci.Quantity,
                VariantJson = ci.VariantJson
            }).ToList();

            return new CartDto
            {
                Items = items,
                ItemCount = items.Sum(i => i.Quantity),
                SubTotal = items.Sum(i => i.ProductPrice * i.Quantity)
            };
        }
    }
}
