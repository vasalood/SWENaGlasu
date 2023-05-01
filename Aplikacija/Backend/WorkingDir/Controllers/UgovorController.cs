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
    public UgovorController(IUgovorService service)
    {
        _service = service;
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
                KupacId = ugovor.Kupac.Id,
                OglasId = ugovor.Oglas.Id
        });
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    
    [HttpGet]
    [Route("VratiSveUgovore/{korisnikId}")]
    public async Task<ActionResult> VratiSveUgovore(int korisnikId)
    {
        try{
            return Ok(await _service.VratiSveUgovore(korisnikId));
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
        oglas.Id = ugovorDto.OglasId;
        Korisnik kupac = new Korisnik();
        kupac.Id = ugovorDto.KupacId;

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