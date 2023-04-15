using Microsoft.EntityFrameworkCore;
using Models;

namespace Domain.Models
{

    public class Ocena
    {
        public long Id { get; set; }
        public int Vrednost { get; set; }
        public Korisnik Vlasnik {get;set;}
        public Oglas Oglas { get; set; }
        public String Komentar;
    }
}