using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class NaGlasuContext: DbContext 
    {
        public DbSet<Kategorija> Kategorije;
    }
}