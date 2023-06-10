using System.Linq.Expressions;
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

    public long KreirajChat(Chat chat)
    {
        chat.Stranka = _korisnikService.VratiKorisnika(chat.Stranka.Id);
        chat.ZaOglas = _oglasService.VratiOglas(chat.ZaOglas.Id);
        _context.Chatovi.Add(chat);
        _context.SaveChanges();
        return chat.Id;

    }
    public void AzurirajPoruku(Poruka poruka)
    {
        _context.Poruke.Update(poruka);
        _context.SaveChanges();
    }

    public long UpisiPoruku(Poruka poruka)
    {
        poruka.Chat = _context.Chatovi.Where(c => poruka.Chat.Id == c.Id).First();
        poruka.Posiljaoc = _korisnikService.VratiKorisnika(poruka.Posiljaoc.Id);
        if(poruka.Ugovor!=null)
            poruka.Ugovor = _ugovorService.VratiUgovor(poruka.Ugovor.Id);
        _context.Poruke.Add(poruka);
        _context.SaveChanges();
        return poruka.Id;
    }

    public List<Poruka> VratiInbox(string id)
    {
        var lista = _context.Poruke.Where(p => p.Chat.Stranka.Id == id || p.Chat.ZaOglas.Vlasnik.Id == id)
        .Include(p => p.Chat).ThenInclude(c=>c.ZaOglas).ThenInclude(o=>o.Slike)
        .Include(p=>p.Chat).ThenInclude(c=>c.ZaOglas).ThenInclude(o=>o.Vlasnik)
        .Include(p=>p.Chat).ThenInclude(c=>c.Stranka)
        .Include(p=>p.Ugovor).Include(p=>p.Posiljaoc)
        .GroupBy(p => p.Chat)
        .Select(g => new { Chat = g.Key, Poruka = g.OrderByDescending(p => p.Timestamp).First() })
        .ToList()
        .Select(a => new Poruka
        {
            Id = a.Poruka.Id,
            Timestamp = a.Poruka.Timestamp,
            Procitana = a.Poruka.Procitana,
            Chat=a.Chat,
            Sadrzaj = a.Poruka.Sadrzaj,
            Ugovor=a.Poruka.Ugovor,
            Posiljaoc=a.Poruka.Posiljaoc
        }).OrderByDescending(p=>p.Timestamp).ToList();

        return lista;
    }

    public Chat VratiChat(long chatId)
    {
        return _context.Chatovi.Where(c => c.Id == chatId)
        .Include(c => c.Stranka)
        .Include(c => c.ZaOglas).ThenInclude(o=>o.Vlasnik)
        .Include(c => c.Poruke).ThenInclude(p => p.Ugovor)
        .Include(c => c.Poruke.OrderByDescending(p=>p.Timestamp)).ThenInclude(p => p.Posiljaoc).First();
    }

    public Chat? VratiChat(long oglasId,string strankaId)
    {
        return _context.Chatovi.Where(c=>c.ZaOglas.Id==oglasId&&c.Stranka.Id==strankaId)
        .Include(c => c.Stranka)
        .Include(c => c.ZaOglas).ThenInclude(o=>o.Vlasnik)
        .Include(c => c.Poruke).ThenInclude(p => p.Ugovor)
        .Include(c => c.Poruke.OrderByDescending(p=>p.Timestamp)).ThenInclude(p => p.Posiljaoc).FirstOrDefault();
    }

    public List<Poruka> VratiPoruke(long[] ids)
    {
        return _context.Poruke.Where(p => ids.Contains(p.Id)).ToList();
    }

    public Poruka VratiPoruku(long id,params Expression<Func<Poruka, object>>[]? lambdas)
    {
        IQueryable<Poruka> query= _context.Poruke.Where(p => p.Id == id);
        if(lambdas!=null)
        {
            foreach(var lambda in lambdas)
            {
                query = query.Include(lambda);
            }
        }
        return query.First();
    }

    public Poruka VratiNaslovnuPoruku(long chatId)
    {
        return _context.Poruke.Where(p => p.Chat.Id == chatId).OrderByDescending(p => p.Timestamp)
        .Include(p => p.Chat).ThenInclude(c => c.ZaOglas).ThenInclude(o => o.Slike)
        .Include(p => p.Chat).ThenInclude(c => c.ZaOglas).ThenInclude(o => o.Vlasnik)
        .Include(p => p.Chat).ThenInclude(c => c.Stranka)
        .Include(p => p.Ugovor).Include(p => p.Posiljaoc).First();
    }
}