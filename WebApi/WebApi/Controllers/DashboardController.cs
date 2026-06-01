using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class DashboardController : ControllerBase
    {
        private readonly NativeDbContext _dbContext;

        public DashboardController(NativeDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("metrics")]
        public async Task<IActionResult> GetDashboardMetrics()
        {
            try
            {
                var totalUsers = await _dbContext.Users.CountAsync();
                var totalProducts = await _dbContext.Products.CountAsync();
                var totalOrders = await _dbContext.Orders.CountAsync();
                var totalRevenue = await _dbContext.Orders
                    .Where(o => o.IsPaid)
                    .SumAsync(o => o.TotalPrice);

                var recentOrders = await _dbContext.Orders
                    .Include(o => o.User)
                    .OrderByDescending(o => o.CreatedAt)
                    .Take(5)
                    .Select(o => new RecentOrderDto
                    {
                        Id = o.Id,
                        UserName = o.User.FirstName + " " + o.User.LastName,
                        TotalPrice = o.TotalPrice,
                        Status = o.Status,
                        CreatedAt = o.CreatedAt
                    })
                    .ToListAsync();

                var topProducts = await _dbContext.OrderItems
                    .GroupBy(oi => oi.ProductId)
                    .Select(g => new TopProductDto
                    {
                        ProductId = g.Key,
                        Name = g.FirstOrDefault().ProductName,
                        Sales = g.Sum(oi => oi.Quantity),
                        Revenue = g.Sum(oi => oi.BasePrice * oi.Quantity)
                    })
                    .OrderByDescending(x => x.Sales)
                    .Take(5)
                    .ToListAsync();

                var lowStockProducts = await _dbContext.Products
                    .Where(p => p.Stock < 20)
                    .Select(p => new LowStockItemDto
                    {
                        ProductId = p.Id,
                        Name = p.Name,
                        Stock = p.Stock
                    })
                    .ToListAsync();

                var metrics = new DashboardMetricsDto
                {
                    TotalCustomers = totalUsers,
                    TotalProducts = totalProducts,
                    TotalOrders = totalOrders,
                    TotalRevenue = totalRevenue,
                    RecentOrders = recentOrders,
                    TopProducts = topProducts,
                    LowStockItems = lowStockProducts
                };

                return Ok(new { data = metrics });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
