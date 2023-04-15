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
    [Route("PostaviSlike/{korisnikId}")]
    public async Task<ActionResult> PostaviSlike([FromForm]List<IFormFile> slike,long oglasId)
    {
        await _service.PostaviSlike(slike,oglasId);
        return Ok("Slike postavljene.");
    }

    [HttpPost]
    [Route("PostaviOglas")]
    public async Task<ActionResult> PostaviOglas([FromBody]Oglas oglas)
    {
        await _service.PostaviOglas(oglas);
        return Ok(oglas.Id);
    }

    


 
}
