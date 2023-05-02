using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Models;
using Domain.Exceptions;

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

        public String Lokacija { get; set; }

        public Stanje? Stanje { get; set; }

        public String Opis{ get; set; }
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
            Vlasnik.UserName = oglas.VlasnikUsername;
            Lokacija = oglas.Lokacija;
            Stanje = oglas.Stanje;
        }

        public Oglas(OglasForm forma)
        {
            foreach (var property in forma.GetType().GetProperties())
            {
                if (property.Name != "PrimljeneSlike" && property.Name != "StavkePoljaImena" && property.Name != "StavkePoljaVrednosti")
                {
                    var value = property.GetValue(forma);
                    if (value == null)
                        throw new NullFormException(property.Name);
                }

            }
            Id = 0;
            Ime = forma.Ime;
            Podkategorija = new Podkategorija() { Id = (int)forma.PodkategorijaId };
            Polja = new Dictionary<string, string>();
            int count = int.Min(forma.StavkePoljaImena != null ? forma.StavkePoljaImena.Count() : 0
            , forma.StavkePoljaVrednosti != null ? forma.StavkePoljaVrednosti.Count() : 0);
            for (int i = 0; i != count; ++i)
            {
                Polja.Add(forma.StavkePoljaImena[i], forma.StavkePoljaVrednosti[i]);
            }
            Kredit = (int)forma.Kredit;
            Smer = (SmerOglasa)forma.Smer;
            Tip = (TipOglasa)forma.Tip;
            Cena = (int)forma.Cena;
            Kolicina = (int)forma.Kolicina;
            BrojPregleda = 0;
            Vlasnik = new Korisnik() { UserName = forma.Username };
            Lokacija = forma.Lokacija;
            Stanje = forma.Stanje;
            Opis = forma.Opis;
        }

    }
}
