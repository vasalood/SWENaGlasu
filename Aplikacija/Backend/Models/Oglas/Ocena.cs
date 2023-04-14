using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Ocena
    {
         [Key]
        public int Id { get; set; }
        public int Vrednost { get; set; }
        public Korisnik Vlasnik {get;set;}
        public String Komentar;
    }
}