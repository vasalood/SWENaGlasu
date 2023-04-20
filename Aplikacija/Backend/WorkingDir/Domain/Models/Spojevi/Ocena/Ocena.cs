using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Domain.Models
{

    public class Ocena
    {
        public long Id { get; set; }
        public int Vrednost { get; set; }
        public Korisnik Vlasnik {get;set;}

        [JsonIgnore]
        public Oglas Oglas { get; set; }
        public String Komentar { get; set; }

        public Ocena(){}

        public Ocena(OcenaDto dto)
        {
            Vrednost = dto.Vrednost;
            Vlasnik = new Korisnik();
            Vlasnik.Id = dto.KorisnikId;
            Komentar = dto.Komentar;
            Oglas = new Oglas();
            Oglas.Id = dto.OglasId;
        }
    }
}