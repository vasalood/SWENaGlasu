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
    public Korisnik VratiKorisnikaPoId(string id)
    {
        var korisnik = _repo.VratiKorisnikaPoId(id);
        if(korisnik==null)
            throw new NullKorisnikException(id);
        return korisnik;
    }
      public Korisnik VratiKorisnika(string username)
    {
        var korisnik = _repo.VratiKorisnika(username);
        if(korisnik==null)
            throw new NullKorisnikException(username);
        return korisnik;
    }
}