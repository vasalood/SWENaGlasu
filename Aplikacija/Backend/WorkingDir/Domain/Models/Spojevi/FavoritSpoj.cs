using Models;

namespace Domain.Models
{
    public class FavoritSpoj
    {
        public int Id { get; set; }
        public Korisnik Korisnik{ get; set; }
        public Oglas Oglas { get; set; }
    }
}