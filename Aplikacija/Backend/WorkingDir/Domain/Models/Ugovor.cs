using Models;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models;

public class Ugovor
{
    [Key]
    public long Id { get; set; }
    public Korisnik Kupac { get; set; }
    public Oglas Oglas { get; set; }
    public DateTime DatumSklapanja { get; set; }
    public int Kolicina { get; set; }
    public string Opis { get; set; }

    public bool Prihvacen{ get; set; }

}