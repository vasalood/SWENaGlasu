namespace Models
{
    public class Ocena
    {
        public int Vrednost { get; set; }
        public Korisnik Vlasnik {get;set;}
        public String Komentar;
    }
}