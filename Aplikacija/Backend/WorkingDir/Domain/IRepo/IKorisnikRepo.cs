using Models;

namespace Domain.IRepo;

public interface IKorisnikRepo
{
    public Korisnik? VratiKorisnika(int id);
}