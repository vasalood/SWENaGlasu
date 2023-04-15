using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    [NotMapped]
    public class OglasDto
    {
        public long Id { get; set; }
        public string Ime { get; set; }
        public Podkategorija Podkategorija{ get; set; }
        public Dictionary<string,string> Polja{ get; set; }
        public int Kredit { get; set; }
        public DateTime DatumPostavljanja{ get; set; }
        public SmerOglasa Smer { get; set; }
        public TipOglasa Tip { get; set; }
        public int Cena { get; set; }
        public int Kolicina { get; set; }
        public int BrojPregleda { get; set; }
        public int VlasnikId{ get; set; }
        public string VlasnikKorisnickoIme{ get; set; }
        public List<Slika> Slike { get; set; }
        public OglasDto()
        {

        }
        public OglasDto(long id, string ime,Podkategorija podkategorija,Dictionary<string,string> polja,
         int kredit,DateTime datumPostavljanja,SmerOglasa smer,TipOglasa tip,
         int cena,int kolicina,int brojPregleda)
        {
            Id = id;
            Ime = ime;
            Podkategorija = podkategorija;
            Polja = polja;
            Kredit = kredit;
            DatumPostavljanja = datumPostavljanja;
            Smer = smer;
            Tip = tip;
            Cena = cena;
            Kolicina = kolicina;
            BrojPregleda = brojPregleda;
        }
        public OglasDto(long id, string ime, Podkategorija podkategorija,Dictionary<string,string> polja,
         int kredit,DateTime datumPostavljanja,SmerOglasa smer,TipOglasa tip,
         int cena,int kolicina,int brojPregleda,int vlasnikId,string vlasnikKorisnickoIme)
         {
            Id = id;
            Ime = ime;
            Podkategorija = podkategorija;
            Polja = polja;
            Kredit = kredit;
            VlasnikId = vlasnikId;
            DatumPostavljanja = datumPostavljanja;
            Smer = smer;
            Tip = tip;
            Cena = cena;
            Kolicina = kolicina;
            VlasnikKorisnickoIme = vlasnikKorisnickoIme;
            BrojPregleda = brojPregleda;
         }


    }
    
}