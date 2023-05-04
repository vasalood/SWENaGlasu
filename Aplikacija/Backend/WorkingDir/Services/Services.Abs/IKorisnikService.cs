using Models;

namespace Services.Abs;

public interface IKorisnikService
{
    Korisnik VratiKorisnika(string id);
    Korisnik VratiKorisnikaPoUsername(string username);
}