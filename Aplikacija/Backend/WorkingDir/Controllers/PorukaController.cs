using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Abs;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class PorukaController : ControllerBase
{

    private IPorukaService _service;
    public PorukaController(IPorukaService service)
    {
        _service = service;
    }

    [HttpGet]
    [Route("VratiInbox/{id}")]
    public ActionResult VratiNaslovnePorukeZaKorisnika(string id)
    {
        try{

            var lista = _service.VratiNaslovnePorukeZaKorisnika(id);
            var retLista = lista.Select(p => new PorukaPogled
            {
                Id=p.Id,
                Timestamp=p.Timestamp,
                ZaOglasNaziv=p.ZaOglas.Ime,
                ZaOglasId=p.ZaOglas.Id,
                StrankaId=p.Stranka.Id,
                StrankaUsername=p.Stranka.UserName,
                Sadrzaj=p.Sadrzaj,
                Smer=p.Smer,
                Procitana=p.Procitana
        });
            return Ok(retLista);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("VratiPorukeZaOglas/{oglasId}/{posiljaocId}")]
    public ActionResult VratiPorukeZaOglas(long oglasId,string posiljaocId)
    {
        try
        {
            var lista =_service.VratiPorukeZaOglas(oglasId, posiljaocId);
            var retLista = lista.Select(p => new PorukaPogled
            {
                Id = p.Id,
                Timestamp = p.Timestamp,
                ZaOglasNaziv = p.ZaOglas.Ime,
                ZaOglasId = p.ZaOglas.Id,
                StrankaId = p.Stranka.Id,
                StrankaUsername = p.Stranka.UserName,
                Sadrzaj = p.Sadrzaj,
                Smer = p.Smer,
                Procitana = p.Procitana
            });
            return Ok(retLista);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
        
    }

    [HttpPost]
    [Route("PosaljiPoruku")]
    public ActionResult PosaljiPoruku(PorukaDto dto)
    {
        try{
            _service.PosaljiPoruku(dto);
            return Ok("Poruka poslata.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    [HttpPost]
    [Route("ObeleziProcitanim")]
    public ActionResult ObeleziProcitanim([FromBody] long[] ids)
    {
        try
        {
            _service.ObeleziProcitanim(ids);
            return Ok("Obelezene procitanim.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }
}