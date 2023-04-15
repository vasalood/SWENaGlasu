using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.AspNetCore.Identity;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController:ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;
    public AuthenticationController(UserManager<IdentityUser> userManager,RoleManager<IdentityRole> roleManager
    ,IConfiguration configuration)
    {
        _userManager=userManager;
        _roleManager=roleManager;
        _configuration=configuration;
    }
    [HttpPost]
    public async Task<IActionResult>Register([FromBody]Korisnik korisnik, string role)
    {
        var userExist= await _userManager.FindByEmailAsync(korisnik.Email);
        if(userExist!=null)
        {
            return BadRequest("Email vec postoji.");
        }
        IdentityUser user = new()
        {
            Email = korisnik.Email,
            SecurityStamp=Guid.NewGuid().ToString(),
            UserName=korisnik.UserName
        };
        if(await _roleManager.RoleExistsAsync(role))
        {
             var result = await _userManager.CreateAsync(user,korisnik.Sifra);
            if(!result.Succeeded)
             {
             var errorMessages = string.Join(", ", result.Errors.Select(e => e.Description));
            return BadRequest($"Neuspesna registracija: {errorMessages}");
             }
            await _userManager.AddToRoleAsync(user,role);
            return Ok("Uspesna registracija");
        }
        else
        {
            return BadRequest("This role doesn't exist.");
        }
        

    }
}