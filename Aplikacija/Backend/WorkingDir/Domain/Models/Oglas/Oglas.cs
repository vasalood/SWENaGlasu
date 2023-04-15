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
        [JsonIgnore]
        public Kategorija Kategorija{ get; set; }
        public Podkategorija Podkategorija{ get; set; }

        [NotMapped]
        public Dictionary<string,string> Polja{ get; set; }


        [Column("Polja",TypeName ="nvarchar(max)")]
        [JsonIgnore]
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
        //public List<FavoritSpoj> Favoriti {get;set;}
        public int Cena { get; set; }

        public int Kolicina { get; set; }

        public int BrojPregleda { get; set; }

        public Korisnik Vlasnik{ get; set; }

        [JsonIgnore]
        public List<FavoritSpoj> Favoriti{ get; set; }
        [JsonIgnore]
        public List<Slika> Slike { get; set; }
        public List<Ocena> Ocene{ get; set; }
        public Oglas()
        {

        }
        public Oglas(long id, string ime,string imeKategorije, int idKategorije, Podkategorija podkategorija,Dictionary<string,string> polja)
        {
            Id = id;
            Ime = ime;
            Kategorija = new Kategorija(imeKategorije, idKategorije);
            Podkategorija = podkategorija;
            Polja = polja;
        }

    }
}
