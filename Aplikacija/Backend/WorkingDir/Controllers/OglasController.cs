using Services.Utility;
using Domain.IRepo.Utility;
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

    [Route("VratiMtihNOglasa/{N}/{M}")]
    [HttpPost]
    public async Task<ActionResult> VratiMtihNOglasa(int N,int M,[FromBody] OglasFilteri? filters )
    {
        try{
            List<Oglas> listaOglasa =await _service.VratiMtihNOglasa(N, M, filters);
            List<OglasDto> retLista = listaOglasa.Select(o => new OglasDto(o)).ToList();
            return Ok(retLista);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
     
    }

    [Route("VratiNaslovneSlike")]
    [HttpGet]
    public async Task<ActionResult> VratiNaslovneSlike([FromQuery] long[] oglasIds)
    {
        try{
            ZipFile zipSlika = await _service.VratiNaslovneSlikeZIP(oglasIds);
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
            ZipFile zipFile= await _service.VratiSlikeZIP(oglasId);
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