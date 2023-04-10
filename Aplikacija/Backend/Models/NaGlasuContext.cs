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
        }
    }
}