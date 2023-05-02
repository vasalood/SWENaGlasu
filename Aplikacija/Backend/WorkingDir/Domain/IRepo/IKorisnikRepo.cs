using Models;

namespace Domain.IRepo;

public interface IKorisnikRepo
{
    public Korisnik? VratiKorisnika(string username);
    public Korisnik? VratiKorisnikaPoId(string Id);
}