using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Models;

namespace Domain.Models
{
    
    public class Oglas
    {

        [Key]
        public long Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Ime { get; set; }

        [NotMapped]
        //[System.Text.Json.Serialization.JsonIgnore]
        public Kategorija Kategorija{ get; set; }
        public Podkategorija Podkategorija{ get; set; }

        [NotMapped]
        public Dictionary<string,string> Polja{ get; set; }


        [Column("Polja",TypeName ="nvarchar(max)")]
        //[System.Text.Json.Serialization.JsonIgnore]
        public string _DictionaryJSON 
        {
            get
            {
                return JsonConvert.SerializeObject(Polja);
            }
            set{
                var tmp = JsonConvert.DeserializeObject<Dictionary<string,string>>(value);
                if(tmp==null)
                    Polja = new Dictionary<string, string>();
                else
                    Polja = tmp;
            }
        }


        //Kredit je valuta promotivne moci. Dinari se uplacuju i konvertuju u kredit koji vremenom opada. 
        public int Kredit { get; set; }
        public DateTime DatumPostavljanja{ get; set; }

        //Slike ce se cuvati na disku umesto u bazi, a u bazi ce se cuvati putanja do slike

        public SmerOglasa Smer { get; set; }
        public TipOglasa Tip { get; set; }

        public int Cena { get; set; }

        public int Kolicina { get; set; }

        public int BrojPregleda { get; set; }

        public Korisnik Vlasnik{ get; set; }

        //[System.Text.Json.Serialization.JsonIgnore]
        public List<FavoritSpoj> Favoriti{ get; set; }
        //[System.Text.Json.Serialization.JsonIgnore]
        public List<Slika> Slike { get; set; }
        public List<Ocena> Ocene{ get; set; }
        public Oglas()
        {

        }
        public Oglas(OglasDto oglas)
        {
            Id = oglas.Id;
            Ime = oglas.Ime;
            Podkategorija = oglas.Podkategorija;
            Polja = oglas.Polja;
            Kredit = oglas.Kredit;
            DatumPostavljanja = oglas.DatumPostavljanja;
            Smer = oglas.Smer;
            Tip = oglas.Tip;
            Cena = oglas.Cena;
            Kolicina = oglas.Kolicina;
            BrojPregleda = oglas.BrojPregleda;
            Slike = oglas.Slike;
            Vlasnik = new Korisnik();
            Vlasnik.Id = oglas.VlasnikId;
        }

        public Oglas(long id, string ime,string imeKategorije,
         int idKategorije, Podkategorija podkategorija,Dictionary<string,string> polja,
         int kredit,DateTime datumPostavljanja,SmerOglasa smer,TipOglasa tip,
         int cena,int kolicina,int brojPregleda)
        {
            Id = id;
            Ime = ime;
            Kategorija = new Kategorija(imeKategorije,idKategorije);
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

        public Oglas(long id, string ime,string imeKategorije,
         int idKategorije, Podkategorija podkategorija,Dictionary<string,string> polja,
         int kredit,DateTime datumPostavljanja,SmerOglasa smer,TipOglasa tip,
         int cena,int kolicina,int brojPregleda,int VlasnikId,string ImeVlasnika)
        {
            Id = id;
            Ime = ime;
            Kategorija = new Kategorija(imeKategorije,idKategorije);
            Podkategorija = podkategorija;
            Polja = polja;
            Kredit = kredit;
            DatumPostavljanja = datumPostavljanja;
            Smer = smer;
            Tip = tip;
            Cena = cena;
            Kolicina = kolicina;
            BrojPregleda = brojPregleda;
            Vlasnik=new Korisnik();
            Vlasnik.Id = VlasnikId;
            Vlasnik.Ime = ImeVlasnika;
        }

    }
}
