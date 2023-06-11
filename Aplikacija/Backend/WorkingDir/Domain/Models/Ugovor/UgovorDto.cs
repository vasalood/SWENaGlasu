namespace Domain.Models;

public class UgovorDto
{
    public long Id { get; set; }
    public string? KupacUsername { get; set; }
    public long? OglasId { get; set; }
    public string? KupacId{ get; set; }
    public DateTime? DatumSklapanja { get; set; }
    public int Kolicina { get; set; }
    public string Opis { get; set; }
    public bool Prihvacen{ get; set; }
    public bool Odbijen{ get; set; }
    public int? Cena{ get; set; }
    public int? Ukupna_Cena{ get; set; }
    public string? OglasNaziv{ get; set; }
    public string? ProdavacUsername{ get; set; }
}