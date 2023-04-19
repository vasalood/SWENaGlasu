using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Models
{
    [Table("Korisnik")]
    public class Korisnik
    {
        [Key]
        
         [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonIgnore]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }
        [Required]
        [MaxLength(50)]
        public string Prezime { get; set; }
        [Required]
        [MaxLength(50)]
        [NotMapped]
        public string UserName { get; set; }
        [Required]
        public string Telefon { get; set; }
        [Required]
        [MaxLength(50)]
        [NotMapped]
        public string Sifra { get; set; }
        
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Molimo unesite validnu email adresu.")]
        [NotMapped]
        public string Email { get; set; }   
        public int Uplata { get; set; } =   0;

    }
}