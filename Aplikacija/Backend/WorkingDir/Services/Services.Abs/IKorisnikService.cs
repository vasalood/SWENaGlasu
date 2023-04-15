using Models;

namespace Services.Abs;

public interface IKorisnikService
{
    Korisnik VratiKorisnika(int id);
}