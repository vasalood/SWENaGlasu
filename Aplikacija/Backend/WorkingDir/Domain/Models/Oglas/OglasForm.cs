using System.ComponentModel.DataAnnotations.Schema;


namespace Domain.Models
{
    [NotMapped]
    public class OglasForm
        {
        public string? Ime { get; set; }
        public int? PodkategorijaId { get; set; }
        public int? KategorijaId{ get; set; }
        public List<String>? StavkePoljaImena { get; set; }
        public List<String>? StavkePoljaVrednosti{ get; set; }
        public int? Kredit { get; set; }
        public SmerOglasa? Smer { get; set; }
        public TipOglasa? Tip { get; set; }
        public int? Cena { get; set; }
        public int? Kolicina { get; set; }
        public string? KorisnikId{ get; set; }
        public List<IFormFile>? PrimljeneSlike { get; set; }
        public String? Lokacija { get; set; }
        public Stanje? Stanje { get; set; }

        public String? Opis{ get; set; }

        public OglasForm()
        {}


     
    }
}