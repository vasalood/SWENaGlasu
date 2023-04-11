using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class NaGlasuContext: DbContext 
    {
        public NaGlasuContext(DbContextOptions<NaGlasuContext> options):base(options)
        {
        }
        public DbSet<Kategorija> Kategorije{get;set;}


        //Ovde se konfigurise izgled baze
        override protected void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Koristi se da se postavi ogranicenje UNIQUE na kolonu ili kolone
            modelBuilder.Entity<Kategorija>().HasAlternateKey(k=>k.Ime);
            //OwnsMany u paru sa Owned anotacijom (vidi klasu Podkategorija) omogucava da se klasa pamti kao slab tip entiteta
            modelBuilder.Entity<Kategorija>().OwnsMany(k=>k.Podkategorije,
            p=>{
                //Ovaj deo overriduje defaultna podesavanja za slabe tipove entiteta odnosno kljuceve
                //Po defaultu se pamti KategorijaId za spoljasnji kljuc, a parcijalni je neki vid Id-a u Podkategoriji

                //Ovde se u podkategoriju dodaje property KategorijaId, nema ga u klasi
                p.Property<int>("KategorijaId");
                //Postavlja se za strani kljuc
                p.WithOwner().HasForeignKey("KategorijaId");

                //Ovde se overriduje default ponasanje, Ime podkategorije i KategorijaId su postavljeni za kljuc
                p.HasKey("Ime","KategorijaId");

            });

            modelBuilder.Entity<Oglas>().OwnsOne(o => o.Kategorija);
            modelBuilder.Entity<Oglas>().OwnsOne(o => o.Podkategorija);

            //TODO: WORK IN PROGRESS

           /*  modelBuilder.Entity<Oglas>(b=>
            {
                b.HasOne<Kategorija>().WithMany().HasForeignKey("KategorijaId");
                b.ToTable("Oglas");
            }); */

        }
    }
}