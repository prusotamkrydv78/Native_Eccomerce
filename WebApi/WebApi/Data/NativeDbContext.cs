using Microsoft.EntityFrameworkCore;
using WebApi.Models.Domain;

namespace WebApi.Data
{
    public class NativeDbContext : DbContext
    {
        public NativeDbContext(DbContextOptions<NativeDbContext> options)
            : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderTracking> OrderTrackings { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Coupon> Coupons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Users - Addresses relationship
            modelBuilder.Entity<Users>()
                .HasMany(u => u.Addresses)
                .WithOne(a => a.User)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Users - Orders relationship
            modelBuilder.Entity<Users>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Users - Notifications relationship
            modelBuilder.Entity<Users>()
                .HasMany(u => u.Notifications)
                .WithOne(n => n.User)
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Category - Product relationship
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            // Category - ParentCategory relationship
            modelBuilder.Entity<Category>()
                .HasOne(c => c.ParentCategory)
                .WithMany(c => c.SubCategories)
                .HasForeignKey(c => c.ParentCategoryId)
                .OnDelete(DeleteBehavior.NoAction);

            // Product - Review relationship
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Product)
                .WithMany(p => p.Reviews)
                .HasForeignKey(r => r.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            // User - Review relationship
            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // Cart - User relationship
            modelBuilder.Entity<Cart>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // CartItem - Cart relationship
            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Cart)
                .WithMany(c => c.Items)
                .HasForeignKey(ci => ci.CartId)
                .OnDelete(DeleteBehavior.Cascade);

            // CartItem - Product relationship
            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Product)
                .WithMany()
                .HasForeignKey(ci => ci.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            // Wishlist - User relationship
            modelBuilder.Entity<Wishlist>()
                .HasOne(w => w.User)
                .WithMany()
                .HasForeignKey(w => w.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Wishlist - Product relationship
            modelBuilder.Entity<Wishlist>()
                .HasOne(w => w.Product)
                .WithMany()
                .HasForeignKey(w => w.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            // Order - OrderItem relationship
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // OrderItem - Product relationship
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Product)
                .WithMany()
                .HasForeignKey(oi => oi.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            // OrderTracking - Order relationship
            modelBuilder.Entity<OrderTracking>()
                .HasOne(ot => ot.Order)
                .WithMany()
                .HasForeignKey(ot => ot.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // Seed some data
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Seed categories with fixed GUIDs
            var electronicsId = new Guid("11111111-1111-1111-1111-111111111111");
            var clothingId = new Guid("22222222-2222-2222-2222-222222222222");
            var seedDate = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            var electronics = new Category
            {
                Id = electronicsId,
                Name = "Electronics",
                Slug = "electronics",
                Description = "Electronic devices and gadgets",
                IsActive = true,
                CreatedAt = seedDate,
                UpdatedAt = seedDate
            };

            var clothing = new Category
            {
                Id = clothingId,
                Name = "Clothing",
                Slug = "clothing",
                Description = "Apparel and fashion",
                IsActive = true,
                CreatedAt = seedDate,
                UpdatedAt = seedDate
            };

            modelBuilder.Entity<Category>().HasData(electronics, clothing);

            // Seed admin user with fixed GUID
            var adminId = new Guid("33333333-3333-3333-3333-333333333333");
            var admin = new Users
            {
                Id = adminId,
                FirstName = "Admin",
                LastName = "User",
                Email = "admin@example.com",
                // Static precomputed PBKDF2-SHA256 hash of "admin123" (salt;hash). Must be static
                // so the seeded model is deterministic across builds (avoids PendingModelChangesWarning).
                Password = "AAECAwQFBgcICQoLDA0ODw==;QYruImrEIfbgvKJd1TVFPj1jqr/M4wSkf2ltGPGot88=",
                Role = "Admin",
                IsBlocked = false,
                CreatedAt = seedDate,
                UpdatedAt = seedDate
            };

            modelBuilder.Entity<Users>().HasData(admin);
        }
    }
}