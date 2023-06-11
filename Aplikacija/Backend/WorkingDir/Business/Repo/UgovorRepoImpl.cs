using Business.Contexts;
using Domain.IRepo;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Utility;

namespace Business.Repo;

public class UgovorRepoImpl : IUgovorRepo
{

    private readonly NaGlasuContext _context;
    private readonly static Dictionary<string, dynamic> _orderByMapper = new Dictionary<string, dynamic>()
    {
        {OrderBy.CENA,((Expression<Func<Ugovor,int>>)(u=>u.Oglas.Cena))},
        {OrderBy.DATUM,(Expression<Func<Ugovor,DateTime>>)(u=>u.DatumSklapanja)},
        {OrderBy.UKUPNA_CENA,(Expression<Func<Ugovor,int>>)(u=>u.Oglas.Cena*u.Kolicina)}
    };
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

    public async Task<List<Ugovor>> VratiMtihNUgovora(string id,int M,int N,bool? zaKupca,bool? potvrdjeni,Order order)
    {

        var sviUgovoriQuery = _context.Ugovori.Include(u=>u.Oglas).Where(u=>u.Prihvacen==(potvrdjeni??u.Prihvacen)).Include(u=>u.Kupac)
        .GroupJoin(_context.Oglasi.Where(o => o.Vlasnik.Id == id),
         u => u.Oglas.Id,o => o.Id, (u, o) => new Ugovor
        {
            Id = u.Id,
            Kolicina = u.Kolicina,
            DatumSklapanja = u.DatumSklapanja,
            Opis = u.Opis,
            Oglas = u.Oglas,
            Prihvacen = u.Prihvacen,
            Odbijen=u.Odbijen,
            Kupac=u.Kupac
        }).Where(u=> u.Kupac.Id==id||u.Oglas.Vlasnik.Id==id );

        var ugovoriZaOglasePostavljeneQuery = _context.Ugovori.Where(u => u.Prihvacen == (potvrdjeni ?? u.Prihvacen))
        .Include(u => u.Kupac).Join(_context.Oglasi.Where(o => o.Vlasnik.Id == id), u => u.Oglas.Id, o => o.Id, (u, o) =>
        new Ugovor
        {
            Id = u.Id,
            Kolicina = u.Kolicina,
            DatumSklapanja = u.DatumSklapanja,
            Opis = u.Opis,
            Oglas = u.Oglas,
            Prihvacen = u.Prihvacen,
            Odbijen=u.Odbijen,
            Kupac = u.Kupac
        });

        var ugovoriZaOglaseKupljeneQuery = _context.Ugovori
        .Where(u => u.Kupac.Id == id && u.Prihvacen == (potvrdjeni ?? u.Prihvacen)).Include(u => u.Kupac).Join(_context.Oglasi
        , u => u.Oglas.Id, o => o.Id, (u, o) => new Ugovor
        {
            Id = u.Id,
            Kolicina = u.Kolicina,
            DatumSklapanja = u.DatumSklapanja,
            Opis = u.Opis,
            Oglas = o,
            Prihvacen = u.Prihvacen,
            Odbijen=u.Odbijen,
            Kupac = u.Kupac
        });

        var activeQuery = zaKupca == null ? sviUgovoriQuery 
        : zaKupca == false ? 
        ugovoriZaOglasePostavljeneQuery 
        : ugovoriZaOglaseKupljeneQuery;

        var activeQueryOrdered = order.Type == OrderType.Ascending ?
        ((IOrderedQueryable<Ugovor>)Queryable.OrderBy(activeQuery, _orderByMapper[order.By]))
        .ThenBy(u => u.Id).Skip(M * N).Take(N) :
        ((IOrderedQueryable<Ugovor>)Queryable.OrderByDescending(activeQuery, _orderByMapper[order.By]))
        .ThenBy(u => u.Id).Skip(M * N).Take(N);

        var retLista = await activeQueryOrdered.ToListAsync();


        return retLista;

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

    public int PrebrojiUgovore(string id,bool? zaKupca,bool? potvrdjeni)
    {
        return zaKupca == null ? _context.Ugovori.Include(u => u.Oglas).Where(u => u.Prihvacen == (potvrdjeni ?? u.Prihvacen))
        .GroupJoin(_context.Oglasi.Where(o => o.Vlasnik.Id == id),
         u => u.Oglas.Id, o => o.Id, (u, o) => new Ugovor
         {
             Id = u.Id,
             Kolicina = u.Kolicina,
             DatumSklapanja = u.DatumSklapanja,
             Opis = u.Opis,
             Oglas = u.Oglas,
             Prihvacen = u.Prihvacen,
             Odbijen=u.Odbijen,
             Kupac = u.Kupac
         }).Where(u => u.Kupac.Id == id || u.Oglas.Vlasnik.Id == id).Count()
        : zaKupca==false?
        _context.Ugovori.Where(u => u.Prihvacen == (potvrdjeni ?? u.Prihvacen))
        .Join(_context.Oglasi.Where(o => o.Vlasnik.Id == id), u => u.Oglas.Id, o => o.Id, (u, o) =>
        new Ugovor
        {
            Id = u.Id,
            Kolicina = u.Kolicina,
            DatumSklapanja = u.DatumSklapanja,
            Opis = u.Opis,
            Oglas = u.Oglas,
            Prihvacen = u.Prihvacen,
            Odbijen=u.Odbijen,
            Kupac = u.Kupac
        }).Count():
        _context.Ugovori
        .Where(u => u.Kupac.Id == id&&u.Prihvacen==(potvrdjeni??u.Prihvacen)).Count();

    }

 
}