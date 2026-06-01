namespace WebApi.Models.DTOs
{
    // Auth DTOs
    public class RegisterDto
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string Role { get; set; } = "User";
    }

    public class LoginDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    public class AuthResponseDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Avatar { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }

    public class RefreshTokenDto
    {
        public required string RefreshToken { get; set; }
    }

    public class UserProfileDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? Avatar { get; set; }
        public string? Phone { get; set; }
        public string Role { get; set; }
        public bool IsBlocked { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class UpdateUserProfileDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Avatar { get; set; }
        public string? Phone { get; set; }
        public string? CurrentPassword { get; set; }
        public string? NewPassword { get; set; }
    }

    // Address DTOs
    public class AddressDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public bool IsDefault { get; set; }
    }

    public class CreateAddressDto
    {
        public required string FullName { get; set; }
        public required string Street { get; set; }
        public required string City { get; set; }
        public required string State { get; set; }
        public required string ZipCode { get; set; }
        public required string Country { get; set; }
        public required string Phone { get; set; }
        public bool IsDefault { get; set; }
    }

    public class UpdateAddressDto
    {
        public string? FullName { get; set; }
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public string? Country { get; set; }
        public string? Phone { get; set; }
        public bool? IsDefault { get; set; }
    }

    // Product DTOs
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal BasePrice { get; set; }
        public decimal? DiscountPrice { get; set; }
        public List<string> Images { get; set; }
        public string? Brand { get; set; }
        public int Stock { get; set; }
        public Guid CategoryId { get; set; }
        public double Rating { get; set; }
        public int ReviewCount { get; set; }
        public bool IsPublished { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateProductDto
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal BasePrice { get; set; }
        public decimal? DiscountPrice { get; set; }
        public List<string> Images { get; set; } = new List<string>();
        public string? Brand { get; set; }
        public int Stock { get; set; }
        public required Guid CategoryId { get; set; }
        public List<string> Tags { get; set; } = new List<string>();
        public string? SpecificationsJson { get; set; }
        public string? VariantsJson { get; set; }
    }

    public class UpdateProductDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? BasePrice { get; set; }
        public decimal? DiscountPrice { get; set; }
        public List<string>? Images { get; set; }
        public string? Brand { get; set; }
        public int? Stock { get; set; }
        public Guid? CategoryId { get; set; }
        public List<string>? Tags { get; set; }
        public string? SpecificationsJson { get; set; }
        public string? VariantsJson { get; set; }
        public bool? IsPublished { get; set; }
    }

    // Category DTOs
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
        public Guid? ParentCategoryId { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateCategoryDto
    {
        public required string Name { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
        public Guid? ParentCategoryId { get; set; }
    }

    public class UpdateCategoryDto
    {
        public string? Name { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
        public Guid? ParentCategoryId { get; set; }
        public bool? IsActive { get; set; }
    }

    // Review DTOs
    public class ReviewDto
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateReviewDto
    {
        public int Rating { get; set; }
        public string? Comment { get; set; }
    }

    // Cart DTOs
    public class CartItemDto
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public string? ProductImage { get; set; }
        public int Quantity { get; set; }
        public string? VariantJson { get; set; }
    }

    public class CreateCartItemDto
    {
        public required Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public string? VariantJson { get; set; }
    }

    public class UpdateCartItemDto
    {
        public int Quantity { get; set; }
    }

    public class CartDto
    {
        public List<CartItemDto> Items { get; set; } = new List<CartItemDto>();
        public int ItemCount { get; set; }
        public decimal SubTotal { get; set; }
    }

    // Wishlist DTOs
    public class WishlistItemDto
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public string? ProductImage { get; set; }
        public DateTime AddedAt { get; set; }
    }

    public class WishlistDto
    {
        public List<WishlistItemDto> Products { get; set; } = new List<WishlistItemDto>();
        public int ItemCount { get; set; }
    }

    // Order DTOs
    public class OrderItemDto
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal BasePrice { get; set; }
        public int Quantity { get; set; }
        public string? VariantJson { get; set; }
    }

    public class ShippingAddressDto
    {
        public string FullName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
    }

    public class CreateOrderDto
    {
        public List<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();
        public ShippingAddressDto ShippingAddress { get; set; }
        public string PaymentMethod { get; set; } = "card";
        public decimal TotalPrice { get; set; }
        public string? CouponCode { get; set; }
    }

    public class OrderDto
    {
        public Guid Id { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
        public ShippingAddressDto ShippingAddress { get; set; }
        public string PaymentMethod { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Tax { get; set; }
        public decimal Shipping { get; set; }
        public decimal Discount { get; set; }
        public decimal TotalPrice { get; set; }
        public string CouponCode { get; set; }
        public string Status { get; set; }
        public bool IsPaid { get; set; }
        public DateTime? PaidAt { get; set; }
        public bool IsDelivered { get; set; }
        public DateTime? DeliveredAt { get; set; }
        public string TrackingNumber { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class OrderTrackingDto
    {
        public Guid OrderId { get; set; }
        public string CurrentStatus { get; set; }
        public string TrackingNumber { get; set; }
        public List<TrackingStepDto> Steps { get; set; }
        public DateTime EstimatedDelivery { get; set; }
        public DateTime LastUpdate { get; set; }
    }

    public class TrackingStepDto
    {
        public string Status { get; set; }
        public string Title { get; set; }
        public DateTime? Timestamp { get; set; }
        public string Location { get; set; }
        public bool Completed { get; set; }
    }

    // Notification DTOs
    public class NotificationDto
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string DataJson { get; set; }
        public bool Read { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class NotificationListDto
    {
        public List<NotificationDto> Notifications { get; set; } = new List<NotificationDto>();
        public int UnreadCount { get; set; }
        public int Total { get; set; }
    }

    // Coupon DTOs
    public class CouponDto
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Type { get; set; }
        public decimal Value { get; set; }
        public decimal? MaxDiscount { get; set; }
        public decimal MinOrderAmount { get; set; }
        public int? UsageLimit { get; set; }
        public int UsageCount { get; set; }
        public bool IsActive { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateCouponDto
    {
        public required string Code { get; set; }
        public string Type { get; set; } = "percentage";
        public decimal Value { get; set; }
        public decimal? MaxDiscount { get; set; }
        public decimal MinOrderAmount { get; set; }
        public int? UsageLimit { get; set; }
        public DateTime? ExpiryDate { get; set; }
    }

    public class ApplyCouponDto
    {
        public required Guid OrderId { get; set; }
        public required string CouponCode { get; set; }
    }

    // Dashboard DTOs
    public class DashboardMetricsDto
    {
        public decimal TotalRevenue { get; set; }
        public int TotalOrders { get; set; }
        public int TotalCustomers { get; set; }
        public int TotalProducts { get; set; }
        public decimal RevenueGrowth { get; set; }
        public int OrdersGrowth { get; set; }
        public decimal ThisMonthRevenue { get; set; }
        public List<RecentOrderDto> RecentOrders { get; set; } = new List<RecentOrderDto>();
        public List<TopProductDto> TopProducts { get; set; } = new List<TopProductDto>();
        public List<LowStockItemDto> LowStockItems { get; set; } = new List<LowStockItemDto>();
    }

    public class RecentOrderDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class TopProductDto
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public int Sales { get; set; }
        public decimal Revenue { get; set; }
    }

    public class LowStockItemDto
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public int Stock { get; set; }
        public string Status { get; set; }
    }
}
