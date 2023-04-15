
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Newtonsoft.Json;

namespace Domain.Models
{
    public class Kategorija
    {
        [Key]
        public int Id{get;set;}

        [Required]
        [MaxLength(50)]
        public string Ime{get;set;}="";

        [NotMapped]
        public Dictionary<string,string> Polja{get;set;}


        [Column("Polja",TypeName ="nvarchar(max)")]

        //_DictionaryJSON je property koji se mapira umesto recnika Polja
        //Nema nikakvu drugu upotrebu u kodu, za sve potrebe se koristiti Polja
        [System.Text.Json.Serialization.JsonIgnore]
        public string _DictionaryJSON
        {
            get
            {
                return JsonConvert.SerializeObject(Polja);
            }

            set
            {
                string _dictionaryJSON=value;
                var tmp= JsonConvert.DeserializeObject<Dictionary<string,string>>(_dictionaryJSON);
                if(tmp!=null)
                    Polja=tmp;
                else
                    Polja =new Dictionary<string,string>();

            }
        }
        public List<Podkategorija> Podkategorije{get;set;}

        public Kategorija()
        {}

        public Kategorija(string ime,int id)
        {
            Id = id;
            Ime = ime;
        }
    }
}
