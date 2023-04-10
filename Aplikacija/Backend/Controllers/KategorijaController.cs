using Microsoft.AspNetCore.Mvc;
using Models;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class KategorijaController : ControllerBase
{
    private readonly NaGlasuContext _context;

    public KategorijaController(NaGlasuContext context)
    {
        _context=context;
    }

    [HttpPost]
    [Route("PostaviKategoriju")]
    public async Task<ActionResult> PostaviKategoriju([FromBody]Kategorija kategorija)
    {
        try{
                _context.Kategorije.Add(kategorija);
                await _context.SaveChangesAsync();
                return Ok("Kategorija dodata.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }
}
