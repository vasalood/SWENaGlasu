using Business.Contexts;
using Domain.IRepo;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Business.Repo;

public class OcenaRepoImpl:IOcenaRepo
{

    private readonly NaGlasuContext _context;

    public OcenaRepoImpl(NaGlasuContext context)
    {
        _context = context;
    }
    public async Task<List<OcenaDto>> VratiMtihNOcena(string id, int M, int N)
    {
        var list =await _context.Oglasi.Where(o => o.Vlasnik.Id == id).Join(_context.Ugovori.Where(u=>u.Ocena!=null),
        o => o.Id, u => u.Oglas.Id, (o, u) =>u).Include(u=>u.Ocena).Include(u=>u.Kupac)
        .OrderBy(u=>u.Ocena.Datum).ThenBy(u=>u.Id).Skip(M*N).Take(N).
        Select(u => new OcenaDto{
            Komentar = u.Ocena.Komentar,
            Vrednost = u.Ocena.Vrednost,
            Id = u.Ocena.Id,
            OglasIme = u.Oglas.Ime,
            Username = u.Kupac.UserName,
            UserId=u.Kupac.Id,
            UgovorId=u.Id,
            Datum=u.Ocena.Datum
        }).ToListAsync();
        return list;
    }

    public int PrebrojOcene(string id)
    {
        return _context.Oglasi.Where(o => o.Vlasnik.Id == id).Join(_context.Ugovori,
        o => o.Id, u => u.Oglas.Id, (o, u) => u).Where(u=>u.Ocena!=null).Count();
    }

    public void ObrisiOcenu(Ocena ocena)
    {
        _context.Remove(ocena);
        _context.SaveChanges();
    }

    public void AzurirajOcenu(Ocena ocena)
    {
        _context.Ocene.Update(ocena);
        _context.SaveChanges();
    }

    public void SacuvajOcenu(Ocena ocena)
    {
        _context.Ocene.Add(ocena);
        _context.SaveChanges();
    }

    public Ocena? VratiOcenu(long id)
    {
        return _context.Ocene.Find(id);
    }
}