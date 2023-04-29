using Business.Contexts;
using Domain.IRepo;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
namespace Business.Repo;

public class UgovorRepoImpl : IUgovorRepo
{

    private readonly NaGlasuContext _context;

    public UgovorRepoImpl(NaGlasuContext context)
    {
        _context = context;
    }
    public void ObrisiUgovor(Ugovor ugovor)
    {
        _context.Ugovori.Remove(ugovor);
        _context.SaveChanges();
    }

    public void UpisiUgovor(Ugovor ugovor)
    {
        _context.Ugovori.Add(ugovor);
        _context.SaveChanges();
    }

    public async Task<List<Ugovor>> VratiSveUgovore(int korisnikId)
    {
        /* var query = _context.Oglasi.Where(o=>o.Vlasnik.Id==korisnikId).Join(_context.Korisnici,
        o=>o.Vlasnik.Id,k=>k.Id,) */
        return await _context.Ugovori.Where(u => u.Oglas.Vlasnik.Id == korisnikId || u.Kupac.Id == korisnikId).ToListAsync();
    }

    public Ugovor? VratiUgovor(long Id)
    {
        return _context.Ugovori.Where(u => u.Id == Id).Include(u=>u.Oglas).Include(u=>u.Kupac).FirstOrDefault();
    }

    public void AzurirajUgovor(Ugovor ugovor)
    {
        _context.Update(ugovor);
        _context.SaveChanges();
    }
}