using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class OglasController : ControllerBase
{
    private readonly NaGlasuContext _context;

    public OglasController(NaGlasuContext context)
    {
        _context=context;
    }


    [Route("VratiMtihNOglasa/{N}/{M}")]
    [HttpGet]
    public async Task<ActionResult> VratiNOglasa(int N,int M,[FromBody] object filters)
    {
        int count;
        if(M==0)
            count = _context.Oglasi.Where(o => 1 == 1).Count();
        var tmp = await _context.Oglasi.Where(o => 1 == 1/*Ovde idu filteri*/).Skip(M * N).Take(N).Include(o=>o.Podkategorija).Join(_context.Kategorije,
        o=>o.Kategorija.Id,k=>k.Id,(o,k)=>new Oglas(o.Id,o.Ime,k.Ime,k.Id,o.Podkategorija,o.Polja)).ToListAsync();
        if(tmp==null)
            return BadRequest("Nema vise oglasa koji zadovoljavaju filtere.");
        return Ok(tmp);


    }

 
}
