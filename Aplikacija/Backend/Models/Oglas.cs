using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Models
{
    
    public class Oglas
    {
        [Owned]
        public class KategorijaStruct
        {
            public string Ime { get; set; }
            public int Id{ get; set; }
        }
        [Key]
        public long Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Ime { get; set; }
        public KategorijaStruct Kategorija{ get; set; }
        public KategorijaStruct Podkategorija{ get; set; }

        [NotMapped]
        public Dictionary<string,string> Polja{ get; set; }


        [Column("Polja",TypeName ="nvarchar(max)")]
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

        public int Kredit { get; set; }
        public DateTime DatumPostavljanja{ get; set; }

        //TODO: Referenca na korisnika

    }
}
