using Domain.Models;

namespace Services.Abs;

public interface IUgovorService
{
    Ugovor VratiUgovor(long Id);
    Task<List<Ugovor>> VratiSveUgovore(int korisnikId);

    void UpisiUgovor(Ugovor ugovor);

    void ObrisiUgovor(long Id);
}