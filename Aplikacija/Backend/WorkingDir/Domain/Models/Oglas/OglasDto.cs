using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    [NotMapped]
    public class OglasDto
    {
        public long Id { get; set; }
        public string Ime { get; set; }
        public Podkategorija Podkategorija{ get; set; }
        public Dictionary<string,string> Polja{ get; set; }
        public int Kredit { get; set; }
        public DateTime DatumPostavljanja{ get; set; }
        public SmerOglasa Smer { get; set; }
        public TipOglasa Tip { get; set; }
        public int Cena { get; set; }
        public int Kolicina { get; set; }
        public int BrojPregleda { get; set; }
        public int VlasnikId{ get; set; }
        public string VlasnikKorisnickoIme{ get; set; }
        public List<Slika> Slike { get; set; }

        public List<IFormFile> SlikeFile{ get; set; }
        public OglasDto()
        {

        }

    


    }
    
}