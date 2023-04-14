using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class FavoritSpoj
    {
         [Key]
        public int Id { get; set; }
        public Korisnik Korisnik{ get; set; }
        public Oglas Oglas { get; set; }
    }
}