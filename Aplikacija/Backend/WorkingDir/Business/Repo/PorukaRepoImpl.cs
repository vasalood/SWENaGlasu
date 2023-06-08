using Business.Contexts;
using Domain.IRepo;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Services.Abs;

namespace Business.Repo;

public class PorukaRepoImpl : IPorukaRepo
{
    private NaGlasuContext _context;
    private IKorisnikService _korisnikService;
    private IOglasService _oglasService;
    private IUgovorService _ugovorService;
    public PorukaRepoImpl(NaGlasuContext context,IKorisnikService korisnikService,IOglasService oglasService,IUgovorService ugovorService)
    {
        _context = context;
        _korisnikService = korisnikService;
        _oglasService = oglasService;
        _ugovorService = ugovorService;
    }
    public void AzurirajPoruku(Poruka poruka)
    {
        _context.Poruke.Update(poruka);
        _context.SaveChanges();
    }

    public void UpisiPoruku(Poruka poruka)
    {
        poruka.Stranka = _korisnikService.VratiKorisnika(poruka.Stranka.Id);
        poruka.ZaOglas = _oglasService.VratiOglas(poruka.ZaOglas.Id, null);
        if(poruka.Ugovor!=null)
            poruka.Ugovor = _ugovorService.VratiUgovor(poruka.Ugovor.Id);
        _context.Poruke.Add(poruka);
        _context.SaveChanges();
    }

    public List<Poruka> VratiNaslovnePorukeZaKorisnika(string id)
    {
        var lista = _context.Poruke.Where(p => p.Stranka.Id == id || p.ZaOglas.Vlasnik.Id == id).Include(p => p.Stranka).Include(p=>p.Ugovor)
        .GroupBy(p => p.ZaOglas)
        .Select(g => new { Oglas = g.Key, Poruka = g.OrderByDescending(p => p.Timestamp).First() })
        .ToList()
        .Select(a => new Poruka
        {
            ZaOglas = a.Oglas,
            Id = a.Poruka.Id,
            Timestamp = a.Poruka.Timestamp,
            Procitana = a.Poruka.Procitana,
            Sadrzaj = a.Poruka.Sadrzaj,
            Smer = a.Poruka.Smer,
            Stranka = a.Poruka.Stranka,
            Ugovor=a.Poruka.Ugovor
        }).OrderByDescending(p=>p.Timestamp).ToList();

        var lista2 = new List<Poruka>();
        return lista;
    }

    public List<Poruka> VratiPorukeZaOglas(long oglasId, string strankaId)
    {
        return _context.Poruke.Where(p =>p.ZaOglas.Id == oglasId&&p.Stranka.Id==strankaId)
        .Include(p=>p.Stranka)
        .Include(p=>p.ZaOglas)
        .Include(p=>p.Ugovor)
        .OrderByDescending(p => p.Timestamp).ToList();
    }

    public List<Poruka> VratiPoruke(long[] ids)
    {
        return _context.Poruke.Where(p => ids.Contains(p.Id)).ToList();
    }
}