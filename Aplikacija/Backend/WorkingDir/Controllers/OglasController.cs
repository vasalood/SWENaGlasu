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
    [HttpPost]
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
    [Route("PostaviOglas")]
    public async Task<ActionResult> PostaviOglas([FromForm]OglasDto oglas)
    {
        try{
            await _service.PostaviOglas(oglas);
            return Ok("Oglas postavljen.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
        
    }


    [Route("VratiSliku/{oglasId}/{brSlike}")]
    [HttpGet]
    public async Task<ActionResult> VratiSliku(long oglasId,int brSlike)
    {
        Slika slika = await _service.VratiSliku(oglasId, brSlike);
        string headerType = "image/";
        string extension=Path.GetExtension(slika.Path);
        if(extension==".png")
            headerType += "png";
        else
            headerType += "jpeg";

        return File(slika.Data,headerType,slika.Path);
    }
 
}