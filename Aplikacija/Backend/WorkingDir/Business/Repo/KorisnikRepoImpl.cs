using Business.Contexts;
using Domain.IRepo;
using Models;

namespace Business.Repo;

public class KorisnikRepoImpl : IKorisnikRepo
{
    private NaGlasuContext _context;
    public KorisnikRepoImpl(NaGlasuContext context)
    {
        _context = context;
    }
    public Korisnik? VratiKorisnika(int id)
    {
        return _context.Korisnici.Find(id);
    }
}