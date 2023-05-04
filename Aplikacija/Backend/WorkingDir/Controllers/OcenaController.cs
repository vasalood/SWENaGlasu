using Microsoft.AspNetCore.Mvc;

using Domain.Models;
using Business.Contexts;

using Services.Abs;
using Models;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class OcenaController : ControllerBase
{
    private readonly IOcenaService _service;
    public OcenaController(IOcenaService service)
    {
        _service = service;
    }

    [HttpPost]
    [Route("OceniOglas")]
    public ActionResult OceniOglas(OcenaDto ocenaDto)
    {
        try{
            _service.Oceni(new Ocena(ocenaDto));
            return Ok($"Ocenjivanje uspesno.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("VratiMtihNOcena/{id}")]
    public async Task<ActionResult> VratiMtihNOcena(string id,[FromQuery]int M, [FromQuery] int N)
    {
        try{
            List<OcenaDto> lista = await _service.VratiMtihNOcena(id, M, N);
            object retObj = new
            {
                Lista = lista
            };
            if(M==0)
                retObj = new
                {
                    Lista = lista,
                    UkupanBr = _service.PrebrojOcene(id)
                };
            return Ok((retObj));
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete]
    [Route("ObrisiOcenu/{id}")]
    public ActionResult ObrisiOcenu(long id)
    {
        try
        {
            _service.ObrisiOcenu(id);
            return Ok($"Ocena sa id: {id} obrisana.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    [Route("AzurirajOcenu")]

    public ActionResult AzurirajOcenu([FromBody]OcenaDto dto)
    {
        try
        {
            _service.AzurirajOcenu(dto);
            return Ok("Ocena azurirana.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
