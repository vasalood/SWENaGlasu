
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Kategorija
    {
        [Key]
        public int Id{get;set;}

        [Required]
        [MaxLength(50)]
        public string Ime{get;set;}
        public Dictionary<string,string> DictionaryNameInput{get;set;}
        public List<string> Podkategorije{get;set;}
    }
}
