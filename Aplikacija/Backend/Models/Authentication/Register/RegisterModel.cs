using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class RegisterModel
    {
        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }
        [Required]
        [MaxLength(50)]
        public string Prezime { get; set; }
        [Required]
        public string? UserName{get;set;}

        [Required]
        public string? Password{get;set;}
        [Required]
                [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Molimo unesite validnu email adresu.")]
        public string Email { get; set; }   
        public int Uplata { get; set; } =   0;
        [Required]
        public string Adresa { get; set; }
         [Required]
        public string Telefon { get; set; }
        public string? Rola {get;set;}
        public string? Slika{get;set;}
        public string? Id{get;set;}
        

    }
}