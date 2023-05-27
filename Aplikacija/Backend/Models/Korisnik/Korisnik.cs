using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Models
{
    [Table("Korisnik")]
    public class Korisnik:IdentityUser
    {
        
        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }
        [Required]
        [MaxLength(50)]
        public string Prezime { get; set; }
   
        [Required]
        public string Telefon { get; set; }
  
        
        public int Uplata { get; set; } =   0;
        public string Adresa { get; set; }
        public string Slika{get;set;}="";
    }
}