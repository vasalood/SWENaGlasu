namespace Domain.Models;

public class UgovorDto
{
    public long Id { get; set; }
    public string? KupacUsername { get; set; }
    public long? OglasId { get; set; }
    public DateTime DatumSklapanja { get; set; }
    public int Kolicina { get; set; }
    public string Opis { get; set; }
    public bool Prihvacen{ get; set; }
}