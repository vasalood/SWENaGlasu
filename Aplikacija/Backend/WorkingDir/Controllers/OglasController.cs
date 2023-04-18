using Controllers.Utils;
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

    [Route("VratiNNaslovnihSlika")]
    [HttpGet]
    public async Task<ActionResult> VratiNNaslovnihSlika([FromQuery] long[] ids)
    {
        try{
            var slike = await _service.VratiNNaslovnihSlika(ids);
            if(slike==null)
                slike = new List<Slika>();
            var zipSlika = await ZipCreator.ZipujNSlike(slike);
            return File(zipSlika.Data, ZipFile.CONTENT_TYPE, zipSlika.Name);
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


    [Route("VratiSlike/{oglasId}")]
    [HttpGet]
    public async Task<ActionResult> VratiSlike(long oglasId)
    {
        try
        {
            List<Slika> slike= await _service.VratiSlike(oglasId);
            ZipFile zipFile = await ZipCreator.ZipujSlike(slike);
            return File(zipFile.Data, ZipFile.CONTENT_TYPE, zipFile.Name); 
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
        
        
    }

    [HttpGet]
    [Route("VratiOglasTEST")]
    public ActionResult VratiOglastTEST(long id)
    {
        return Ok(_service.VratiOglas(id));
    }
}