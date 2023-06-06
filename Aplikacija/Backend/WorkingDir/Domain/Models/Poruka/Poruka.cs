using Models;

namespace Domain.Models;

public class Poruka
{
    public long Id { get; set; }
    public long Timestamp{ get; set; }

    public Oglas ZaOglas{ get; set; }

    public Korisnik Stranka { get; set; }

    public string Sadrzaj{ get; set;}

    public bool Smer{ get; set; }//za true je Stranka posiljaoc, za false je vlasnik oglasa

    public bool Procitana { get; set; }

    public Poruka()
    {
        
    }

    public Poruka(PorukaDto dto)
    {
        Id = dto.Id;
        Timestamp = dto.Timestamp;
        ZaOglas = new Oglas { Id = dto.OglasId };
        Procitana = dto.Procitana;
        Stranka = new Korisnik { Id = dto.StrankaId };
        Sadrzaj=dto.Sadrzaj;
        Smer = dto.Smer;
    }
}