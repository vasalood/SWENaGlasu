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
    public Korisnik VratiKorisnika(int id)
    {
        var korisnik = _repo.VratiKorisnika(id);
        if(korisnik==null)
            throw new NullKorisnikException(id);
        return korisnik;
    }
}