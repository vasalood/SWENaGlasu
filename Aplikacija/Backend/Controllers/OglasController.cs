using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System.IO;
using Utility;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class OglasController : ControllerBase
{
    private IWebHostEnvironment _environment;
    private const int  MAX_BR_SLIKA= 5;
    private const string SLIKE_FOLDER = "SlikeOglasa";

    //10MB
    private const long MAX_VELICINA_SLIKE = 10*0b1_00000_00000_00000_00000;
    private string FOLDER_PATH;
    private readonly NaGlasuContext _context;

    public OglasController(NaGlasuContext context,IWebHostEnvironment environment)
    {
        _context=context;
        _environment = environment;
        FOLDER_PATH = Path.Combine(_environment.WebRootPath,SLIKE_FOLDER);
        if(!Directory.Exists(FOLDER_PATH))
        {
            Directory.CreateDirectory(FOLDER_PATH);
        }
    }



    //TODO: definisati sve filtere [i napraviti klasu filter]
    [Route("VratiMtihNOglasa/{N}/{M}")]
    [HttpGet]
    public async Task<ActionResult> VratiMtihNOglasa(int N,int M,[FromBody] object filters)
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

    [HttpPost]
    [Route("PostaviOglas/{korisnikId}")]
    public async Task<ActionResult> PostaviOglas([FromRoute]int korisnikId,[FromBody]Oglas oglas,[FromForm]List<IFormFile> slike)
    {
        if(slike.Count>MAX_BR_SLIKA)
            return BadRequest($"Broj slika veci od dozvoljenog ({MAX_BR_SLIKA})");
        List<string> filePaths = new List<string>(MAX_BR_SLIKA);
        foreach(IFormFile slika in slike)
        {
            //if(slika.ContentType!="image/jpeg"||slika.ContentType!="image/png")
                //return BadRequest($"Slika {slika.FileName} je nedozvoljenog tipa (dozvoljene su samo png i jpg slike)");
            String extension = Path.GetExtension(slika.FileName);
            if(extension!=".png"&&extension!=".jpg")
                return BadRequest($"Slika {slika.FileName} ima nedozvoljenu ekstenziju ({extension})");
            if(slika.Length>MAX_VELICINA_SLIKE)
                return BadRequest($"Slika {slika.FileName} je veca od dozvoljene velicine ({MAX_VELICINA_SLIKE})");
            string fPath;
            do {
                fPath = Path.Combine(FOLDER_PATH,RandomString.GenerateFilename(extension));
            } while (System.IO.File.Exists(fPath));
            filePaths.Add(fPath);
        }
        for (int i = 0; i != slike.Count;++i)
        {
            using(FileStream fs = System.IO.File.Create(filePaths[i]))
            {
                await slike[i].CopyToAsync(fs);
                fs.Flush();
            }
        }
        return Ok("Slike postavljene uspesno.");
    }

    


 
}
