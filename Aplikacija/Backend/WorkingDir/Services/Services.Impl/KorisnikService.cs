using Domain.Exceptions;
using Domain.IRepo;
using Models;
using Services.Abs;

namespace Services.Impl;

public class KorisnikService : IKorisnikService
{
    private IKorisnikRepo _repo;
    public KorisnikService(IKorisnikRepo repo)
    {
        _repo = repo;
    }
    public Korisnik VratiKorisnika(string id)
    {
        var korisnik = _repo.VratiKorisnika(id);
        if(korisnik==null)
            throw new NullKorisnikException(id);
        return korisnik;
    }
      public Korisnik VratiKorisnikaPoUsername(string username)
    {
        var korisnik = _repo.VratiKorisnikaPoUsername(username);
        if(korisnik==null)
            throw new NullKorisnikException(username);
        return korisnik;
    }
}