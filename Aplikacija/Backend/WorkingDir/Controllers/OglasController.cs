using Services.Utility;
using Domain.IRepo.Utility;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Abs;
using Utility;
using Microsoft.AspNetCore.Authorization;
using Domain.Exceptions;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Models;
namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class OglasController : ControllerBase
{

    private readonly IOglasService _service;
    private readonly UserManager<Korisnik> _userManager;
    public OglasController(IOglasService service,UserManager<Korisnik> userManager)
    {
        _userManager = userManager;
        _service = service;
    }

    [Route("VratiMtihNOglasa/{N}/{M}/{orderBy}/{orderType}")]
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

    [HttpPost]
    [Route("PrebrojiOglaseZaFiltere")]
    public async Task<ActionResult> PrebrojiOglaseZaFiltere(OglasFilteri? filters)
    {
        try
        {
            return Ok(await _service.PrebrojiOglaseZaFiltere(filters));
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("VratiSliku/{naziv}")]
    [HttpGet]
    public ActionResult VratiSliku(string naziv)
    {
        try{
            byte[] slika = _service.VratiSliku(naziv);
            return File(slika, $"image/{Path.GetExtension(naziv)}");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }
    [Authorize(Roles ="Admin, Moderator, PremiumUser, User")]
    [HttpPost]
    [Route("PostaviOglas")]
    public async Task<ActionResult> PostaviOglas([FromForm] OglasForm forma)
    {
        try
        {
            var Identity = (ClaimsIdentity)User?.Identity;
            var claim =   Identity?.FindFirst(ClaimTypes.Name);
            var myUsername=claim?.Value;
            if(myUsername==null)
                throw new NullKorisnikException("nepostojeci korisnik");
            Korisnik? korisnik = await _userManager.FindByNameAsync(myUsername);
            if(korisnik==null)
                throw new NullKorisnikException(myUsername);
            if(korisnik.Id!=forma.KorisnikId)
                throw new UnauthorizedAccessException("Nedozvoljen pristup.");
            if(await _userManager.IsInRoleAsync(korisnik,"User"))
            {
                OglasFilteri filterUsername = new OglasFilteri();
                filterUsername.Username = myUsername;
                int count = await _service.PrebrojiOglaseZaFiltere(filterUsername);
                if(count>4)
                    return BadRequest("Maksimalan broj postavljenih oglasa (5) je dostignut.");
            }
            return Ok(await _service.PostaviOglas(forma));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }


    [HttpGet]
    [Route("VratiOglas/{id}")]
    public ActionResult VratiOglas([FromRoute]long id)
    {
        try
        {
            Oglas o =_service.VratiOglas(id, o => o.Vlasnik,o=>o.Podkategorija,o=>o.Vlasnik);
            OglasDto oDto = new OglasDto(o)
            {
                SlikeZaSlanje = o.Slike.Select(s => new SlikaDto
                {
                    Naziv = Path.GetFileName(s.Path),
                    Redosled = s.Redosled
                }).ToList()
            };
            return Ok(oDto);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [Authorize(Roles ="Admin, Moderator, PremiumUser, User")]
    [HttpGet]
    [Route("JelFavorit")]

    public ActionResult JelFavorit([FromQuery]long oglasId,[FromQuery]string id)
    {
        try{
            
            return Ok(_service.JelFavorit(oglasId,id)); // id ako je favorit, 0 ako nije
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(Roles ="Admin, Moderator, PremiumUser, User")]
    [HttpPost]
    [Route("AzurirajOglas")]
    public ActionResult AzurirajOglas([FromForm]OglasForm form,[FromQuery] long oglasId)
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
    [Authorize(Roles ="Admin, Moderator, PremiumUser, User")]
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

    [Authorize(Roles ="Admin, Moderator, PremiumUser, User")]
    [HttpDelete]
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
    [Authorize(Roles ="Admin, Moderator, PremiumUser, User")]
    [HttpDelete]
    [Route("ObrisiOglas/{id}")]
    public ActionResult ObrisiOglas(long id)
    {
        try{
            _service.ObrisiOglas(id);
            return Ok("Oglas obrisan");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    
}