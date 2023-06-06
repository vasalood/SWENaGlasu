namespace Domain.Models;

public class PorukaDto
{
    public long Id{ get; set; }
    public long Timestamp { get; set; }

    public long OglasId{ get; set; }

    public string StrankaId { get; set; }

    public string Sadrzaj{ get; set;}

    public bool Smer{ get; set; }//za true je Stranka posiljaoc, za false je vlasnik oglasa

    public bool Procitana { get; set; }
}