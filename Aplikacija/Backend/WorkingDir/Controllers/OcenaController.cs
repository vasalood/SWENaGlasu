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
    [Route("VratiOcene/{username}")]
    public async Task<ActionResult> VratiOcene(string username,[FromQuery]int M, [FromQuery] int N)
    {
        try{
            return Ok((await _service.VratiOcene(username,M,N)));
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
