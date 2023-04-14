using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class NaGlasuContext: DbContext 
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
            //Koristi se da se postavi ogranicenje UNIQUE na kolonu ili kolone
            modelBuilder.Entity<Kategorija>().HasAlternateKey(k=>k.Ime);

            modelBuilder.Entity<Podkategorija>().Property<int>("KategorijaId");
            modelBuilder.Entity<Kategorija>().HasMany(k => k.Podkategorije).WithOne().HasForeignKey("KategorijaId");
            modelBuilder.Entity<Podkategorija>().HasAlternateKey("Ime", "KategorijaId");

        }
    }
}