using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models.Domain;
using WebApi.Models.DTOs;
using WebApi.Utils;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task<UserProfileDto> GetUserProfileAsync(Guid userId);
        Task<UserProfileDto> UpdateUserProfileAsync(Guid userId, UpdateUserProfileDto updateUserProfileDto);
        Task<AddressDto> AddAddressAsync(Guid userId, CreateAddressDto createAddressDto);
        Task<List<AddressDto>> GetAddressesAsync(Guid userId);
        Task DeleteAddressAsync(Guid userId, Guid addressId);
        Task<List<UserProfileDto>> GetAllUsersAsync();
    }

    public class UserService : IUserService
    {
        private readonly NativeDbContext _context;

        public UserService(NativeDbContext context)
        {
            _context = context;
        }

        public async Task<UserProfileDto> GetUserProfileAsync(Guid userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            return new UserProfileDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Avatar = user.Avatar,
                Phone = user.Phone,
                Role = user.Role,
                IsBlocked = user.IsBlocked,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<UserProfileDto> UpdateUserProfileAsync(Guid userId, UpdateUserProfileDto updateUserProfileDto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            if (!string.IsNullOrEmpty(updateUserProfileDto.FirstName))
                user.FirstName = updateUserProfileDto.FirstName;

            if (!string.IsNullOrEmpty(updateUserProfileDto.LastName))
                user.LastName = updateUserProfileDto.LastName;

            if (!string.IsNullOrEmpty(updateUserProfileDto.Avatar))
                user.Avatar = updateUserProfileDto.Avatar;

            if (!string.IsNullOrEmpty(updateUserProfileDto.Phone))
                user.Phone = updateUserProfileDto.Phone;

            if (!string.IsNullOrEmpty(updateUserProfileDto.CurrentPassword) && !string.IsNullOrEmpty(updateUserProfileDto.NewPassword))
            {
                if (!PasswordHasherUtil.VerifyPassword(user.Password, updateUserProfileDto.CurrentPassword))
                    throw new Exception("Current password is incorrect");

                user.Password = PasswordHasherUtil.HashPassword(updateUserProfileDto.NewPassword);
            }

            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return new UserProfileDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Avatar = user.Avatar,
                Phone = user.Phone,
                Role = user.Role,
                IsBlocked = user.IsBlocked,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<AddressDto> AddAddressAsync(Guid userId, CreateAddressDto createAddressDto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            var address = new Address
            {
                UserId = userId,
                FullName = createAddressDto.FullName,
                Street = createAddressDto.Street,
                City = createAddressDto.City,
                State = createAddressDto.State,
                ZipCode = createAddressDto.ZipCode,
                Country = createAddressDto.Country,
                Phone = createAddressDto.Phone,
                IsDefault = createAddressDto.IsDefault,
                CreatedAt = DateTime.UtcNow
            };

            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();

            return new AddressDto
            {
                Id = address.Id,
                FullName = address.FullName,
                Street = address.Street,
                City = address.City,
                State = address.State,
                ZipCode = address.ZipCode,
                Country = address.Country,
                Phone = address.Phone,
                IsDefault = address.IsDefault
            };
        }

        public async Task<List<AddressDto>> GetAddressesAsync(Guid userId)
        {
            var addresses = await _context.Addresses
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.IsDefault)
                .ThenByDescending(a => a.CreatedAt)
                .ToListAsync();

            return addresses.Select(a => new AddressDto
            {
                Id = a.Id,
                FullName = a.FullName,
                Street = a.Street,
                City = a.City,
                State = a.State,
                ZipCode = a.ZipCode,
                Country = a.Country,
                Phone = a.Phone,
                IsDefault = a.IsDefault
            }).ToList();
        }

        public async Task DeleteAddressAsync(Guid userId, Guid addressId)
        {
            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.Id == addressId && a.UserId == userId);
            if (address == null)
                throw new Exception("Address not found");

            _context.Addresses.Remove(address);
            await _context.SaveChangesAsync();
        }

        public async Task<List<UserProfileDto>> GetAllUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            return users.Select(u => new UserProfileDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Avatar = u.Avatar,
                Phone = u.Phone,
                Role = u.Role,
                IsBlocked = u.IsBlocked,
                CreatedAt = u.CreatedAt
            }).ToList();
        }
    }
}
