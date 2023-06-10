using Models;

namespace Domain.Models;

public class Poruka
{
    public long Id { get; set; }
    public long Timestamp{ get; set; }
    public Chat Chat { get; set; }
    public string? Sadrzaj{ get; set;}

    public Korisnik Posiljaoc{ get; set; }//za true je Stranka posiljaoc, za false je vlasnik oglasa

    public bool Procitana { get; set; }

    public Ugovor? Ugovor{ get; set; }

    public Poruka()
    {
        
    }

    public Poruka(PorukaDto dto)
    {
        Timestamp = dto.Timestamp;
        Procitana = dto.Procitana;
        Chat = new Chat { Id = dto.ChatId };
        Sadrzaj=dto.Sadrzaj;
        Posiljaoc = new Korisnik { Id = dto.PosiljaocId };
        if(dto.UgovorId!=null) Ugovor = new Ugovor { Id = (long)dto.UgovorId };
    }
}