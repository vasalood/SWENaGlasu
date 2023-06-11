using Microsoft.AspNetCore.Mvc;

using Domain.Models;
using Business.Contexts;

using Services.Abs;
using Models;
using Utility;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class UgovorController : ControllerBase
{
    private readonly IUgovorService _service;
    private readonly IKorisnikService _korisnikService;
    public UgovorController(IUgovorService service,IKorisnikService korisnikService)
    {
        _service = service;
        _korisnikService = korisnikService;
    }

    [HttpGet]
    [Route("VratiUgovor/{Id}")]
    public ActionResult VratiUgovor(long Id)
    {
        try{
            Ugovor ugovor = _service.VratiUgovor(Id);
            return Ok(new UgovorDto
            {
                Id = ugovor.Id,
                Kolicina = ugovor.Kolicina,
                Prihvacen = ugovor.Prihvacen,
                Odbijen=ugovor.Odbijen,
                DatumSklapanja = ugovor.DatumSklapanja,
                Opis = ugovor.Opis,
                KupacUsername = ugovor.Kupac.UserName,
                KupacId=ugovor.Kupac.Id,
                OglasId = ugovor.Oglas.Id,
                Cena=ugovor.Oglas.Cena,
                Ukupna_Cena=ugovor.Oglas.Cena*ugovor.Kolicina
        });
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    
    [HttpGet]
    [Route("VratiMtihNUgovora/{korisnikId}")]
    public async Task<ActionResult> VratiMtihNUgovora([FromRoute]string korisnikId,int M, int N,bool? zaKupca,bool? prihvaceni,
    string orderBy,OrderType orderType)
    {
        try{
            //if(korisnik!=null&&korisnik.UserName==username)
            {
                var lista = await _service.VratiMtihNUgovora(korisnikId,M,N,zaKupca,prihvaceni,new Order(orderBy,orderType));
                var lista2 = lista.Select(u=>new UgovorDto
                {
                    Id=u.Id,
                    DatumSklapanja=u.DatumSklapanja,
                    Opis=u.Opis,
                    OglasId=u.Oglas.Id,
                    OglasNaziv=u.Oglas.Ime,
                    KupacUsername=u.Kupac.UserName,
                    KupacId=u.Kupac.Id,
                    Kolicina=u.Kolicina,
                    Prihvacen=u.Prihvacen,
                    Odbijen=u.Odbijen,
                    Cena=u.Oglas.Cena,
                    Ukupna_Cena=u.Oglas.Cena*u.Kolicina,
                    ProdavacUsername=u.Oglas.Vlasnik.UserName
                }).ToList();

                object retobj = new { Lista = lista2 };
                if(M==0)
                    retobj = new { Lista = lista2, UkupanBr = _service.PrebrojiUgovore(korisnikId, zaKupca, prihvaceni) };
                return Ok(retobj);
            }
                
            //throw new UnauthorizedAccessException("Nedozvoljeni pristup privatnim resursima.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

 /*    [HttpPut]
    [Route("AzurirajUgovor")]
    public ActionResult AzurirajUgovor(UgovorDto ugovorDto)
    {
        try{
            Ugovor ugovor = new Ugovor
            {
                Id = ugovorDto.Id,
                Kolicina = ugovorDto.Kolicina,
                Prihvacen = ugovorDto.Prihvacen,
                Opis = ugovorDto.Opis
            };
            _service.AzurirajUgovor(ugovor);
            return Ok($"Ugovor sa id: {ugovor.Id} azuriran.");

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    } */

    [HttpPut]
    [Route("PrihvatiIliOdbijUgovor/{id}/{value}")]
    public ActionResult PrihvatiUgovor(long id,bool value)
    {
        try{
            Ugovor u =_service.VratiUgovor(id);
            if(value)
                u.Prihvacen = true;
            else
                u.Odbijen = true;
            _service.AzurirajUgovor(u);
            return Ok();
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    
    [HttpDelete]
    [Route("ObrisiUgovor/{ugovorId}")]
    public ActionResult ObrisiUgovor(long ugovorId)
    {
        try{
            _service.ObrisiUgovor(ugovorId);
            return Ok($"Ugovor sa id: {ugovorId} obrisan.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    [Route("PostaviUgovor")]
    public ActionResult PostaviUgovor(UgovorDto ugovorDto)
    {
        Oglas oglas = new Oglas();
        if(ugovorDto.OglasId==null||ugovorDto.KupacId==null)
            throw new ArgumentNullException("Ugovor mora da referencira korisnika i oglas.");
        oglas.Id = (long)ugovorDto.OglasId;
        Korisnik kupac = new Korisnik();
        kupac.Id = ugovorDto.KupacId;

        try{
            Ugovor ugovor = new Ugovor
            {
                Id = ugovorDto.Id,
                DatumSklapanja = DateTime.Now,
                Kolicina = ugovorDto.Kolicina,
                Prihvacen = ugovorDto.Prihvacen,
                Odbijen=ugovorDto.Odbijen,
                Opis = ugovorDto.Opis,
                Kupac=kupac,
                Oglas=oglas
            };
            _service.UpisiUgovor(ugovor);
            return Ok(ugovor.Id);

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }


}