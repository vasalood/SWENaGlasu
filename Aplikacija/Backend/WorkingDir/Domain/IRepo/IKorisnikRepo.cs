using Models;

namespace Domain.IRepo;

public interface IKorisnikRepo
{
    public Korisnik? VratiKorisnikaPoUsername(string username);
    public Korisnik? VratiKorisnika(string Id);
}