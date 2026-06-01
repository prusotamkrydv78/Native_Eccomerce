using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models.Domain;
using WebApi.Models.DTOs;

namespace WebApi.Services
{
    public interface INotificationService
    {
        Task<NotificationListDto> GetNotificationsAsync(Guid userId, int limit = 20, int skip = 0);
        Task MarkAsReadAsync(Guid userId, Guid notificationId);
        Task DeleteNotificationAsync(Guid userId, Guid notificationId);
        Task CreateNotificationAsync(Guid userId, string type, string title, string message, string? dataJson = null);
    }

    public class NotificationService : INotificationService
    {
        private readonly NativeDbContext _context;

        public NotificationService(NativeDbContext context)
        {
            _context = context;
        }

        public async Task<NotificationListDto> GetNotificationsAsync(Guid userId, int limit = 20, int skip = 0)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .Skip(skip)
                .Take(limit)
                .ToListAsync();

            var unreadCount = await _context.Notifications
                .CountAsync(n => n.UserId == userId && !n.Read);

            var total = await _context.Notifications
                .CountAsync(n => n.UserId == userId);

            return new NotificationListDto
            {
                Notifications = notifications.Select(MapToNotificationDto).ToList(),
                UnreadCount = unreadCount,
                Total = total
            };
        }

        public async Task MarkAsReadAsync(Guid userId, Guid notificationId)
        {
            var notification = await _context.Notifications
                .FirstOrDefaultAsync(n => n.Id == notificationId && n.UserId == userId);

            if (notification == null)
                throw new Exception("Notification not found");

            notification.Read = true;
            notification.ReadAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteNotificationAsync(Guid userId, Guid notificationId)
        {
            var notification = await _context.Notifications
                .FirstOrDefaultAsync(n => n.Id == notificationId && n.UserId == userId);

            if (notification == null)
                throw new Exception("Notification not found");

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();
        }

        public async Task CreateNotificationAsync(Guid userId, string type, string title, string message, string? dataJson = null)
        {
            var notification = new Notification
            {
                UserId = userId,
                Type = type,
                Title = title,
                Message = message,
                DataJson = dataJson ?? "",
                Read = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }

        private NotificationDto MapToNotificationDto(Notification notification)
        {
            return new NotificationDto
            {
                Id = notification.Id,
                Type = notification.Type,
                Title = notification.Title,
                Message = notification.Message,
                DataJson = notification.DataJson,
                Read = notification.Read,
                CreatedAt = notification.CreatedAt
            };
        }
    }
}
