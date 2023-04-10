
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Newtonsoft.Json;

namespace Models
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

        private string _dictionaryJSON="";

        [Column("Polja",TypeName ="nvarchar(max)")]
        public string _DictionaryJSON
        {
            get
            {
                return JsonConvert.SerializeObject(Polja);
            }

            set
            {
                _dictionaryJSON=value;
                var tmp= JsonConvert.DeserializeObject<Dictionary<string,string>>(_dictionaryJSON);
                if(tmp!=null)
                    Polja=tmp;
                else
                    Polja =new Dictionary<string,string>();

            }
        }
        public List<Podkategorija> Podkategorije{get;set;}
    }
}
