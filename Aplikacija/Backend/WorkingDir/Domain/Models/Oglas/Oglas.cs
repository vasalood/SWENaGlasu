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

        //[System.Text.Json.Serialization.JsonIgnore]
        public Podkategorija Podkategorija{ get; set; }

        [NotMapped]
        public Dictionary<string,string> Polja{ get; set; }

        //public string Grad { get; set; }
        [Column("Polja",TypeName ="nvarchar(max)")]
        [System.Text.Json.Serialization.JsonIgnore]
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

        [System.Text.Json.Serialization.JsonIgnore]
        public List<FavoritSpoj> Favoriti{ get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public List<Slika>? Slike { get; set; }
        public List<Ocena> Ocene{ get; set; }

        public String Lokacija { get; set; }

        public Stanje? Stanje { get; set; }
        public Oglas()
        {

        }
        public Oglas(OglasDto oglas)
        {
            Id = oglas.Id;
            Ime = oglas.Ime;
            Podkategorija = oglas.Podkategorija;
            Polja = new Dictionary<string, string>();
            int count = int.Min(oglas.StavkePoljaImena.Count(), oglas.StavkePoljaVrednosti.Count());
            for (int i = 0; i != count;++i)
            {
                Polja.Add(oglas.StavkePoljaImena[i], oglas.StavkePoljaVrednosti[i]);
            }
            Kredit = oglas.Kredit;
            DatumPostavljanja = oglas.DatumPostavljanja;
            Smer = oglas.Smer;
            Tip = oglas.Tip;
            Cena = oglas.Cena;
            Kolicina = oglas.Kolicina;
            BrojPregleda = oglas.BrojPregleda;
            Vlasnik = new Korisnik();
            Vlasnik.Id = oglas.VlasnikId;
            Lokacija = oglas.Lokacija;
            Stanje = oglas.Stanje;
        }


        /* public Oglas(long id, string ime, Podkategorija podkategorija,string KategorijaIme, Dictionary<string,string> polja,
         int kredit,DateTime datumPostavljanja,SmerOglasa smer,TipOglasa tip,
         int cena,int kolicina,int brojPregleda,int VlasnikId,string UsernameVlasnika,Stanje? stanje, String lokacija)
        {

            //o.Id, o.Ime, o.Podkategorija, k.Ime, o.Polja, o.Kredit, o.DatumPostavljanja, o.Smer, o.Tip,
            //o.Cena, o.Kolicina, o.BrojPregleda, o.Vlasnik.Id, o.Vlasnik.UserName,o.Stanje,o.Lokacija
            Id = id;
            Ime = ime;
            Podkategorija = podkategorija;
            Podkategorija.KategorijaNaziv = KategorijaIme;
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
            Vlasnik.UserName = UsernameVlasnika;
            Stanje = stanje;
            Lokacija = lokacija;
        } */

    }
}
