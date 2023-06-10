
using Models;

namespace Domain.Models;

public class Chat
{
    public long Id { get; set; }
    public Oglas ZaOglas {get;set;}
    public Korisnik Stranka { get; set; }
    public List<Poruka> Poruke{ get; set; }
}