using Domain.IRepo;
using Domain.Models;
using Services.Abs;
using Domain.Exceptions;
using Models;
using Utility;

namespace Services.Impl;

public class UgovorService : IUgovorService
{
    private readonly IUgovorRepo _repo;
    private readonly IKorisnikService _korisnikService;
    private readonly IOglasService _oglasService;

    public UgovorService(IUgovorRepo repo,IKorisnikService korisnikService,IOglasService oglasService)
    {
        _repo = repo;
        _korisnikService = korisnikService;
        _oglasService = oglasService;
    }
    public void ObrisiUgovor(long Id)
    {
        var ugovor = _repo.VratiUgovor(Id);
        if(ugovor==null)
            throw new NullUgovorException(Id);
        _repo.ObrisiUgovor(ugovor);
    }

    public void UpisiUgovor(Ugovor ugovor)
    {
        Korisnik Korisnik = _korisnikService.VratiKorisnika(ugovor.Kupac.Id);
        Oglas Oglas = _oglasService.VratiOglas(ugovor.Oglas.Id,o=>o.Vlasnik);
        if(ugovor.Kolicina>Oglas.Kolicina)
            throw new PrevelikaKolicinaException(Oglas.Kolicina);
        ugovor.Kupac = Korisnik;
        ugovor.Oglas = Oglas;
        _repo.UpisiUgovor(ugovor);
    }

    public async Task<List<Ugovor>> VratiMtihNUgovora(string id,int M,int N,bool? zaKupca,bool? prihvaceni,Order order)
    {
        return await _repo.VratiMtihNUgovora(id,M,N,zaKupca,prihvaceni,order);
    }

    public Ugovor VratiUgovor(long Id)
    {
        var ugovor= _repo.VratiUgovor(Id);
        if(ugovor==null)
            throw new NullUgovorException(Id);
        return ugovor;
    }

    public void AzurirajUgovor(Ugovor ugovor)
    {
        var stariUgovor = _repo.VratiUgovor(ugovor.Id);
        if(stariUgovor==null)
        {
            throw new NullUgovorException(ugovor.Id);
        }
        if(ugovor.Kolicina>stariUgovor.Oglas.Kolicina)
            throw new PrevelikaKolicinaException(stariUgovor.Oglas.Kolicina);
        stariUgovor.Kolicina = ugovor.Kolicina;
        stariUgovor.Opis = ugovor.Opis;
        stariUgovor.Prihvacen = ugovor.Prihvacen;
        if(ugovor.Prihvacen==true)
        {
            stariUgovor.Oglas.Kolicina -= stariUgovor.Kolicina;
            stariUgovor.DatumSklapanja = DateTime.Now;
        }

        _repo.AzurirajUgovor(stariUgovor);
    }

    public int PrebrojiUgovore(string id,bool? zaKupca,bool? potvrdjeni)
    {
        return _repo.PrebrojiUgovore(id, zaKupca, potvrdjeni);
    }

}