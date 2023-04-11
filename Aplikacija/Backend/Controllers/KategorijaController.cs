using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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



    //TODO: Pitanje dal ovo treba uopste, nek ostane za sad.
    [HttpGet]
    [Route("VratiKategoriju/{id}")]

    public ActionResult VratiKategorijuId([FromRoute]int id)
    {
        try
        {
            var tmp=_context.Kategorije.Where(k=>k.Id.Equals(id)).Include(k=>k.Podkategorije).FirstOrDefault();
             if(tmp==null)
                return BadRequest($"Nepostoji kategorija sa id-em: \"{id}\"");

            object ret = new 
            {
                Id=tmp.Id,
                Ime=tmp.Ime,
                Podkategorije=tmp.Podkategorije
            };
            return Ok(ret);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("VratiKategorijeIPodkategorije")]
    public async Task<ActionResult> VratiKategorijeIPodkategorije()
    {
        try
        {
            var tmp= await _context.Kategorije.AsNoTracking().Where(k=>1==1).OrderBy(k=>k.Ime).Include(k=>k.Podkategorije).Select(k=> new {
                Ime=k.Ime,
                Id=k.Id,
                Podkategorije=k.Podkategorije.OrderBy(p=>p.Ime)
                }).ToListAsync();

           
            return Ok(tmp);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    [Route("PromeniKategoriju")]
    public async Task<ActionResult> PromeniKategoriju([FromBody] Kategorija kategorija)
    {

        var mKategorija = _context.Kategorije.Where(k=>k.Id==kategorija.Id).Include(k=>k.Podkategorije).FirstOrDefault();
        if(mKategorija==null)
            return BadRequest($"Ne postoji kategorija: {{Id:{kategorija.Id},Ime:{kategorija.Ime}}}");
        try
        {
            //TODO: Mozda treba da bude implementirana promena imena
            //TODO: Posto mora da se kategorija obrise da bi to radilo, pa onda da se prodje kroz bazu i svuda gde se javlja ime
            //TODO: ili kljuc kategorije da se azurira, mozda je previse neprakticno

            mKategorija.Podkategorije=kategorija.Podkategorije;
            mKategorija.Polja=kategorija.Polja;

            await _context.SaveChangesAsync();
            return Ok("Kategorija uspesno promenjena.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    [HttpGet]
    [Route("VratiPoljaKategorije/{id}")]
    public async Task<ActionResult> VratiPoljaKategorije([FromRoute] int id)
    {
        var polja = await _context.Kategorije.Where(k => k.Id == id).Select(k => k.Polja).FirstOrDefaultAsync();
        if(polja==null)
            return BadRequest($"Nepostoji kategorija sa id-em {id}.");
        return Ok(polja);
    }
}
