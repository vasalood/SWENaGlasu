using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class NaGlasuContext: DbContext 
    {
        public NaGlasuContext(DbContextOptions<NaGlasuContext> options):base(options)
        {
        }
        public DbSet<Kategorija> Kategorije{get;set;}

        override protected void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Kategorija>().HasAlternateKey(k=>k.Ime);
            modelBuilder.Entity<Kategorija>().OwnsMany(k=>k.Podkategorije,
            p=>{
                p.Property<int>("KategorijaId");
                p.WithOwner().HasForeignKey("KategorijaId");
                p.HasKey("Ime","KategorijaId");
            });

        }
    }
}