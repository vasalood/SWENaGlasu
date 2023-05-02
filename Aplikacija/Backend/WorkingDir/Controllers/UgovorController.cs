using Microsoft.AspNetCore.Mvc;

using Domain.Models;
using Business.Contexts;

using Services.Abs;
using Models;

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
                DatumSklapanja = ugovor.DatumSklapanja,
                Opis = ugovor.Opis,
                KupacUsername = ugovor.Kupac.UserName,
                OglasId = ugovor.Oglas.Id
        });
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    
    [HttpGet]
    [Route("VratiMtihNUgovora")]
    public async Task<ActionResult> VratiMtihNUgovora(string username,int M, int N)
    {
        try{
            //if(korisnik!=null&&korisnik.UserName==username)
            {
                var lista = await _service.VratiMtihNUgovora(username,M,N);
                var lista2 = lista.Select(u=>new UgovorDto
                {
                    Id=u.Id,
                    DatumSklapanja=u.DatumSklapanja,
                    Opis=u.Opis,
                    OglasId=u.Oglas.Id,
                    KupacUsername=u.Kupac.UserName,
                    Kolicina=u.Kolicina,
                    Prihvacen=u.Prihvacen
                }).ToList();
                return Ok(lista2);
            }
                
            //throw new UnauthorizedAccessException("Nedozvoljeni pristup privatnim resursima.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
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
        if(ugovorDto.OglasId==null||ugovorDto.KupacUsername==null)
            throw new ArgumentNullException("Ugovor mora da referencira korisnika i oglas.");
        oglas.Id = (long)ugovorDto.OglasId;
        Korisnik kupac = new Korisnik();
        kupac.UserName = ugovorDto.KupacUsername;

        try{
            Ugovor ugovor = new Ugovor
            {
                Id = ugovorDto.Id,
                DatumSklapanja = DateTime.Now,
                Kolicina = ugovorDto.Kolicina,
                Prihvacen = ugovorDto.Prihvacen,
                Opis = ugovorDto.Opis,
                Kupac=kupac,
                Oglas=oglas
            };
            _service.UpisiUgovor(ugovor);
            return Ok($"Ugovor sa id: {ugovor.Id} kreiran.");

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }


}