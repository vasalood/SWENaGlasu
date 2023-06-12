using Microsoft.AspNetCore.Mvc;
using Domain.Models;
using Business.Contexts;
using Services.Abs;
using Microsoft.AspNetCore.Authorization;
namespace Controllers{

[ApiController]
[Route("[controller]")]
public class KategorijaController : ControllerBase
{
    private readonly IKategorijaService _service;
    public KategorijaController(IKategorijaService service)
    {
        _service = service;
    }
    [Authorize(Roles ="Admin")]
    [HttpPost]
    [Route("PostaviKategoriju")]
    public async Task<ActionResult> PostaviKategoriju([FromBody]KategorijaDto kategorija)
    {
        try{
                await _service.DodajKategoriju(new Kategorija(kategorija));
            return Ok("Kategorija dodata.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }



    //TODO: Pitanje dal ovo treba uopste, nek ostane za sad.
    [HttpGet]
    [Route("VratiKategoriju/{id}")]

    public ActionResult VratiKategorijuId([FromRoute]int id)
    {
        try
        {
            Kategorija tmp = _service.VratiKategoriju(id);

            //TODO: KategorijaDto, Mapper?
 
            return Ok(tmp);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet]
    [Route("VratiKategorije")]
    public async Task<ActionResult> VratiKategorije()
    {
        try
        {
            return Ok(await _service.VratiKategorije());
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    [Route("PromeniKategoriju")]
    public async Task<ActionResult> PromeniKategoriju([FromBody] KategorijaDto dto,int id)
    {
        try
        {
            Kategorija kategorija = new Kategorija(dto);
            kategorija.Id = id;
            await _service.AzurirajKategoriju(kategorija);
            return Ok("Kategorija uspesno promenjena.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }


    /* //DEPRECATED
    [HttpGet]
    [Route("VratiPoljaKategorije/{id}")]
    public ActionResult VratiPoljaKategorije([FromRoute] int id)
    {
        try{
                return Ok(_service.VratiPoljaKategorije(id));
            }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    } */

    [HttpDelete]
    [Route("ObrisiKategoriju/{id}")]
    public async Task<ActionResult> ObrisiKategoriju(int id)
    {
        try{
                await _service.ObrisiKategoriju(id);
                return Ok("Kategorija uspesno obrisana.");
            }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}


}

