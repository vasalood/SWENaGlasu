using Models;

namespace Domain.Models
{
    public class FavoritSpoj
    {
        public int Id { get; set; }
        public Korisnik Korisnik{ get; set; }
        public Oglas Oglas { get; set; }
        public FavoritSpoj(){}

        public FavoritSpoj(FavoritSpojDto dto)
        {
            Id = 0;
            Korisnik = new Korisnik()
            {
                UserName = dto.Username
            };

            Oglas = new Oglas() { 
                Id=dto.OglasId
            };
        }
    }
}