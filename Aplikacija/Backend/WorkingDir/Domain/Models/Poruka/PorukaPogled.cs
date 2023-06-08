namespace Domain.Models;

public class PorukaPogled
{
    public long Id { get; set; }
    public long Timestamp{ get; set; }

    public string ZaOglasNaziv{ get; set; }
    public long ZaOglasId{ get; set; }

    public string StrankaId { get; set; }
    public string StrankaUsername { get; set; }

    public string? Sadrzaj{ get; set;}

    public bool Smer{ get; set; }//za true je Stranka posiljaoc, za false je vlasnik oglasa

    public bool Procitana { get; set; }

    public UgovorPorukaDto? Ugovor{ get; set; }

    public PorukaPogled(){}

    public PorukaPogled(long id, long timestamp, string oglasNaziv,long oglasId,string strankaId,string strankaUsername,string? sadrzaj, bool smer, bool procitana)
    {
        Id = id;
        Timestamp = timestamp;
        ZaOglasNaziv = oglasNaziv;
        ZaOglasId = oglasId;
        StrankaId = strankaId;
        StrankaUsername = strankaUsername;
        Sadrzaj = sadrzaj;
        Smer = smer;
        Procitana = procitana;
    }
}