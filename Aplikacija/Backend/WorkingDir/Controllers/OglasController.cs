using Services.Utility;
using Domain.IRepo.Utility;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Abs;
using Utility;
using Microsoft.AspNetCore.Authorization;
using Domain.Exceptions;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class OglasController : ControllerBase
{

    private readonly IOglasService _service;
    public OglasController(IOglasService service)
    {
        _service = service;
    }

    [Route("VratiMtihNOglasa/{N}/{M}")]
    [HttpPost]
    public async Task<ActionResult> VratiMtihNOglasa(int N, int M, [FromBody] OglasFilteri? filters,string orderBy,OrderType orderType)
    {
        try
        {
            List<Oglas> listaOglasa = await _service.VratiMtihNOglasa(N, M, filters,new Order(orderBy,orderType));
            List<OglasDto> retLista = listaOglasa.Select(o => new OglasDto(o)).ToList();
            object retObj = new {
                Lista=retLista
                };
            if(M==0)
            {
                retObj = new
                {
                    Lista = retLista,
                    UkupanBr = await _service.PrebrojiOglaseZaFiltere(filters)
                };
            }
        return Ok(retObj);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    [Route("VratiNaslovneSlike")]
    [HttpGet]
    public async Task<ActionResult> VratiNaslovneSlike([FromQuery] long[] oglasIds)
    {
        try
        {
            ZipFile zipSlika = await _service.VratiNaslovneSlikeZIP(oglasIds);
            return File(zipSlika.Data, ZipFile.CONTENT_TYPE, zipSlika.Name);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    [HttpPost]
    [Route("PostaviOglas")]
    public async Task<ActionResult> PostaviOglas([FromForm] OglasForm forma)
    {
        try
        {
            await _service.PostaviOglas(forma);
            return Ok("Oglas postavljen.");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }


    [Route("VratiSlike/{oglasId}")]
    [HttpGet]
    public async Task<ActionResult> VratiSlike(long oglasId)
    {
        try
        {
            ZipFile zipFile = await _service.VratiSlikeZIP(oglasId);
            return File(zipFile.Data, ZipFile.CONTENT_TYPE, zipFile.Name);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }


    }

    [HttpGet]
    [Route("VratiOglasTEST")]
    public ActionResult VratiOglastTEST(long id)
    {
        try
        {
            return Ok(_service.VratiOglas(id));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("JelFavorit")]

    public ActionResult JelFavorit([FromQuery]long oglasId,[FromQuery]string id)
    {
        try{
            
            return Ok(_service.JelFavorit(oglasId,id));
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //[Authorize(Roles ="Korisnik")]
    [HttpPost]
    [Route("AzurirajOglas")]
    public async Task<ActionResult> AzurirajOglas([FromForm]OglasForm form,[FromQuery] long oglasId)
    {
        
        try
        {
            Oglas oglas = _service.VratiOglas(oglasId);
            //var u = HttpContext.User;
            _service.AzurirajOglas(oglas,form);

            return Ok($"Oglas sa id: {oglas.Id} je uspesno azuriran.");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    [Route("DodajFavorita")]

    public ActionResult DodajFavorita(FavoritSpojDto favorit)
    {
        try
        {
            var fav = new FavoritSpoj(favorit);
            _service.DodajFavorita(fav);
            return Ok($"Favorit zabelezen sa id {fav.Id}");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    
    [HttpPost]
    [Route("SkiniFavorita")]
    public ActionResult SkiniFavorita(int Id)
    {
        try
        {
            _service.SkiniFavorita(Id);
            return Ok("Favorit skinut.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("VratiFavorite/{userId}")]
    public async Task<ActionResult> VratiFavorite(string userId,[FromQuery]int M, [FromQuery]int N,string orderBy,OrderType orderType)
    {
        try
        {
            List<Oglas> listaOglasa = await _service.VratiFavorite(userId, M, N, new Order(orderBy, orderType));
            List<OglasDto> retLista = listaOglasa.Select(o => new OglasDto(o)).ToList();
            object retObj = new {
                Lista=retLista
                };
            if(M==0)
            {
                retObj = new
                {
                    Lista = retLista,
                    UkupanBr = _service.PrebrojiFavorite(userId)
            };
            }
        return Ok(retObj);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    [Route("InkrementOglasPregledi/{id}")]
    public ActionResult InkrementOglasPregledi(long id)
    {
        try
        {
            _service.InkrementOglasPregledi(id);
            return Ok("Pregledi povecani za jedan.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    
}