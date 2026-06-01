using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models.Domain;
using WebApi.Models.DTOs;
using System.Text.Json;

namespace WebApi.Services
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(Guid userId, CreateOrderDto createOrderDto);
        Task<List<OrderDto>> GetUserOrdersAsync(Guid userId);
        Task<List<OrderDto>> GetAllOrdersAsync();
        Task<OrderDto> GetOrderByIdAsync(Guid id);
        Task<OrderTrackingDto> GetOrderTrackingAsync(Guid orderId);
        Task<OrderDto> UpdateOrderToPaidAsync(Guid orderId);
        Task<OrderDto> UpdateOrderToDeliveredAsync(Guid orderId);
    }

    public class OrderService : IOrderService
    {
        private readonly NativeDbContext _context;

        public OrderService(NativeDbContext context)
        {
            _context = context;
        }

        public async Task<OrderDto> CreateOrderAsync(Guid userId, CreateOrderDto createOrderDto)
        {
            var order = new Order
            {
                UserId = userId,
                OrderItems = new List<OrderItem>(),
                ShippingAddressJson = JsonSerializer.Serialize(createOrderDto.ShippingAddress),
                PaymentMethod = createOrderDto.PaymentMethod,
                TotalPrice = createOrderDto.TotalPrice,
                CouponCode = createOrderDto.CouponCode ?? "",
                Status = "pending",
                IsPaid = false,
                IsDelivered = false,
                CreatedAt = DateTime.UtcNow
            };

            decimal subtotal = 0;
            foreach (var item in createOrderDto.OrderItems)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product == null)
                    throw new Exception($"Product {item.ProductId} not found");

                if (product.Stock < item.Quantity)
                    throw new Exception($"Insufficient stock for product {product.Name}");

                var orderItem = new OrderItem
                {
                    ProductId = item.ProductId,
                    ProductName = item.ProductName,
                    BasePrice = item.BasePrice,
                    Quantity = item.Quantity,
                    VariantJson = item.VariantJson ?? ""
                };

                order.OrderItems.Add(orderItem);
                subtotal += item.BasePrice * item.Quantity;
                product.Stock -= item.Quantity;
            }

            order.SubTotal = subtotal;
            order.Tax = subtotal * 0.1m;
            order.Shipping = 15m;
            order.TrackingNumber = "TRK" + Guid.NewGuid().ToString("N").Substring(0, 10).ToUpper();

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Clear user's cart
            var cart = await _context.Carts.Include(c => c.Items).FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart != null)
            {
                _context.CartItems.RemoveRange(cart.Items);
                await _context.SaveChangesAsync();
            }

            return MapToOrderDto(order);
        }

        public async Task<List<OrderDto>> GetUserOrdersAsync(Guid userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            return orders.Select(MapToOrderDto).ToList();
        }

        public async Task<List<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            return orders.Select(MapToOrderDto).ToList();
        }

        public async Task<OrderDto> GetOrderByIdAsync(Guid id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                throw new Exception("Order not found");

            return MapToOrderDto(order);
        }

        public async Task<OrderTrackingDto> GetOrderTrackingAsync(Guid orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
                throw new Exception("Order not found");

            var steps = new List<TrackingStepDto>
            {
                new TrackingStepDto
                {
                    Status = "order_placed",
                    Title = "Order Placed",
                    Timestamp = order.CreatedAt,
                    Location = "Order Confirmed",
                    Completed = true
                },
                new TrackingStepDto
                {
                    Status = "processing",
                    Title = "Processing",
                    Timestamp = order.IsPaid ? new DateTime(order.CreatedAt.Ticks + TimeSpan.FromHours(2).Ticks) : null,
                    Location = "Warehouse",
                    Completed = order.IsPaid
                },
                new TrackingStepDto
                {
                    Status = "shipped",
                    Title = "Shipped",
                    Timestamp = order.IsPaid ? new DateTime(order.CreatedAt.Ticks + TimeSpan.FromHours(24).Ticks) : null,
                    Location = "In Transit",
                    Completed = order.IsDelivered || order.IsPaid
                },
                new TrackingStepDto
                {
                    Status = "out_for_delivery",
                    Title = "Out for Delivery",
                    Timestamp = order.IsDelivered ? new DateTime(order.CreatedAt.Ticks + TimeSpan.FromHours(48).Ticks) : null,
                    Location = "Local Delivery",
                    Completed = false
                },
                new TrackingStepDto
                {
                    Status = "delivered",
                    Title = "Delivered",
                    Timestamp = order.DeliveredAt,
                    Location = "Your Location",
                    Completed = order.IsDelivered
                }
            };

            return new OrderTrackingDto
            {
                OrderId = order.Id,
                CurrentStatus = order.IsDelivered ? "delivered" : order.IsPaid ? "shipped" : "processing",
                TrackingNumber = order.TrackingNumber,
                Steps = steps,
                EstimatedDelivery = order.CreatedAt.AddDays(5),
                LastUpdate = DateTime.UtcNow
            };
        }

        public async Task<OrderDto> UpdateOrderToPaidAsync(Guid orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
                throw new Exception("Order not found");

            order.IsPaid = true;
            order.PaidAt = DateTime.UtcNow;
            order.Status = "processing";
            order.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return MapToOrderDto(order);
        }

        public async Task<OrderDto> UpdateOrderToDeliveredAsync(Guid orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
                throw new Exception("Order not found");

            order.IsDelivered = true;
            order.DeliveredAt = DateTime.UtcNow;
            order.Status = "delivered";
            order.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return MapToOrderDto(order);
        }

        private OrderDto MapToOrderDto(Order order)
        {
            var shippingAddress = new ShippingAddressDto();
            try
            {
                shippingAddress = JsonSerializer.Deserialize<ShippingAddressDto>(order.ShippingAddressJson) ?? new ShippingAddressDto();
            }
            catch { }

            return new OrderDto
            {
                Id = order.Id,
                OrderItems = order.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    ProductName = oi.ProductName,
                    BasePrice = oi.BasePrice,
                    Quantity = oi.Quantity,
                    VariantJson = oi.VariantJson
                }).ToList(),
                ShippingAddress = shippingAddress,
                PaymentMethod = order.PaymentMethod,
                SubTotal = order.SubTotal,
                Tax = order.Tax,
                Shipping = order.Shipping,
                Discount = order.Discount,
                TotalPrice = order.TotalPrice,
                CouponCode = order.CouponCode,
                Status = order.Status,
                IsPaid = order.IsPaid,
                PaidAt = order.PaidAt,
                IsDelivered = order.IsDelivered,
                DeliveredAt = order.DeliveredAt,
                TrackingNumber = order.TrackingNumber,
                CreatedAt = order.CreatedAt
            };
        }
    }
}
