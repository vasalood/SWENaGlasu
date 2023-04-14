using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace Models
{
    public class NaGlasuContext: IdentityDbContext<IdentityUser> 
    {
        public NaGlasuContext(DbContextOptions<NaGlasuContext> options):base(options)
        {
        }
        public DbSet<Kategorija> Kategorije{get;set;}
        public DbSet<Oglas> Oglasi { get; set; }

        public DbSet<Korisnik> Korisnici{ get; set; }
        //Ovde se konfigurise izgled baze
        override protected void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //Koristi se da se postavi ogranicenje UNIQUE na kolonu ili kolone
            modelBuilder.Entity<Kategorija>().HasAlternateKey(k=>k.Ime);
            modelBuilder.Entity<Podkategorija>().Property<int>("KategorijaId");
            modelBuilder.Entity<Kategorija>().HasMany(k => k.Podkategorije).WithOne().HasForeignKey("KategorijaId");
            modelBuilder.Entity<Podkategorija>().HasAlternateKey("Ime", "KategorijaId");
            modelBuilder.Entity<Ocena>().HasOne(o => o.Vlasnik).WithMany().OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<FavoritSpoj>().HasOne(f => f.Korisnik).WithMany().OnDelete(DeleteBehavior.NoAction);
           
            SeedRoles(modelBuilder);

            modelBuilder.Entity<Ocena>().HasOne(o => o.Vlasnik).WithMany().OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<FavoritSpoj>().HasOne(f => f.Korisnik).WithMany().OnDelete(DeleteBehavior.NoAction);

        }
        private static void SeedRoles(ModelBuilder builder)
        {
      
            builder.Entity<IdentityRole>().HasData
            (
                new IdentityRole(){Name = "Admin", ConcurrencyStamp="1", NormalizedName="Admin"},
                new IdentityRole(){Name = "Moderator", ConcurrencyStamp="2", NormalizedName="Moderator"},
                new IdentityRole(){Name = "PremiumUser", ConcurrencyStamp="3", NormalizedName="PremiumUser"},
                new IdentityRole(){Name = "User", ConcurrencyStamp="4", NormalizedName="User"},
                new IdentityRole(){Name = "Guest", ConcurrencyStamp="5", NormalizedName="Guest"}
            );
           
        }
    }
}