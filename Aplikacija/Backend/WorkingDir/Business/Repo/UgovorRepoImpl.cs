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

    public async Task<List<Ugovor>> VratiMtihNUgovora(string username,int M,int N)
    {
        var ugovoriZaOglasePostavljene= await _context.Oglasi.Where(o => o.Vlasnik.UserName == username).Join(_context.Ugovori,
        o => o.Id, u => u.Oglas.Id, (o, u) => new
        {
            Id=u.Id,
            Kolicina = u.Kolicina,
            DatumSklapanja = u.DatumSklapanja,
            Opis = u.Opis,
            Oglas = o,
            Prihvacen=u.Prihvacen,
            Kupac = u.Kupac,
            VlasnikUsername=o.Vlasnik.UserName
        }).OrderBy(u=>u.DatumSklapanja).ThenBy(u=>u.Id).Select(aU=>new Ugovor
        {
            Id=aU.Id,
            Kolicina=aU.Kolicina,
            DatumSklapanja=aU.DatumSklapanja,
            Opis=aU.Opis,
            Oglas=aU.Oglas,
            Prihvacen=aU.Prihvacen,
            Kupac=aU.Kupac
        }).ToListAsync();
        var ugovoriZaOglaseKupljene = await _context.Ugovori.Where(u => u.Kupac.UserName == username).Include(u => u.Oglas).ToListAsync();

        return ugovoriZaOglaseKupljene.Concat(ugovoriZaOglasePostavljene).OrderBy(u=>u.DatumSklapanja).ToList();

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