using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Business.Contexts;


namespace Backend.Controllers;
[Authorize(Roles ="Admin")]
[ApiController]
[Route("[controller]")]
public class KorisnikController : ControllerBase
{
    public NaGlasuContext Context { get; set; }
    public KorisnikController(NaGlasuContext context)
    {
        Context=context;
    }
    [Route("Preuzmi")]
    [HttpGet]
    public ActionResult Preuzmi()
    {
        return Ok(Context.Korisnici);
    }
    [Route("Registracija")]
    [HttpPost]
    public async Task<ActionResult> Registracija([FromBody] Korisnik korisnik)
    {
        var postojeciKorisnik = Context.Korisnici.FirstOrDefault(kor=>kor.Email==korisnik.Email);
        if (postojeciKorisnik!= null)
        {
            return BadRequest("Email već postoji");
        }
        if(string.IsNullOrWhiteSpace(korisnik.Ime)||korisnik.Ime.Length>50)
        {
            return BadRequest("Pogresno ime");
        }
         if(string.IsNullOrWhiteSpace(korisnik.Prezime)||korisnik.Prezime.Length>50)
        {
            return BadRequest("Pogresno prezime");
        }
        try
        {
            Context.Korisnici.Add(korisnik);
            await Context.SaveChangesAsync();
            return Ok("Uspesna registracija!");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
