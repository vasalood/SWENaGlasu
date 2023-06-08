namespace Domain.Models;

public class UgovorPorukaDto
{
    public string Opis{ get; set; }
    public int Kolicina{ get; set; }
    public bool Prihvacen{ get; set; }

    public long Id{ get; set; }

    public UgovorPorukaDto(string opis, int kolicina, bool prihvacen, long id)
    {
        Opis = opis;
        Kolicina = kolicina;
        Prihvacen = prihvacen;
        Id = id;
    }
}