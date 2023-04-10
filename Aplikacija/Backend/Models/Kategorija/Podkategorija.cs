using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Podkategorija
    {
        [Key]
        public int Id{get;set;}

        [Required]
        [MaxLength(50)]
        public string Ime{get;set;}
    }
}