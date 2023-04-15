using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Abs;

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

    //TODO: definisati sve filtere [i napraviti klasu filter]
    [Route("VratiMtihNOglasa/{N}/{M}")]
    [HttpGet]
    public async Task<ActionResult> VratiMtihNOglasa(int N,int M,[FromBody] object filters)
    {
        try{
            return Ok(await _service.VratiMtihNOglasa(N, M, filters));
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
     
    }

    [HttpPost]
    [Route("PostaviSlike/{korisnikId}/{oglasId}")]
    public async Task<ActionResult> PostaviSlike([FromForm]List<IFormFile> slike,long oglasId)
    {
        await _service.PostaviSlike(slike,oglasId);
        return Ok("Slike postavljene.");
    }

    [HttpPost]
    [Route("PostaviOglas")]
    public async Task<ActionResult> PostaviOglas([FromBody]OglasDto oglas)
    {
        Oglas praviOglas = new Oglas(oglas);
        await _service.PostaviOglas(praviOglas);
        return Ok(praviOglas.Id);
    }

    /* [Route("VratiSlike/{oglasId}/{brSlike}")]
    [HttpGet]
    public async Task<ActionResult> VratiSlike(long oglasId,int brSlike)
    {
        _service.VratiSliku(oglasId, brSlike);
        return File();
    } */
 
}
