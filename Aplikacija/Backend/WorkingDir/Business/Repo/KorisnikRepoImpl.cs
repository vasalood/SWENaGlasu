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
    public Korisnik? VratiKorisnikaPoUsername(string UserName)
    {
        return _context.Korisnici.Where(k=>k.UserName==UserName).FirstOrDefault();
    }
    public Korisnik? VratiKorisnika(string Id)
    {
        return _context.Korisnici.Find(Id);
    }
}