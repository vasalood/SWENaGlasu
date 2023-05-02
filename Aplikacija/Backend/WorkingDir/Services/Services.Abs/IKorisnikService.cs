using Models;

namespace Services.Abs;

public interface IKorisnikService
{
    Korisnik VratiKorisnikaPoId(string id);
    Korisnik VratiKorisnika(string username);
}