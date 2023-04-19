using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UserManagementService;
using MimeKit;
using MailKit.Net.Smtp;
using System.Net;
using Business.Contexts;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController:ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _configuration;
    private readonly  NaGlasuContext _context ;
    public AuthenticationController(UserManager<IdentityUser> userManager,RoleManager<IdentityRole> roleManager
    ,IConfiguration configuration,IEmailService emailService,NaGlasuContext context )
    {
        _userManager=userManager;
        _roleManager=roleManager;
        _configuration=configuration;
       _emailService=emailService;
       _context=context;
    }
    [HttpPost]
    public async Task<IActionResult>Register([FromBody]Korisnik korisnik, string role)
    {
        ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
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
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink=Url.Action(nameof(ConfirmEmail),"Authentication", new {token,email=user.Email}, Request.Scheme);
            var message = new Message(new string[] { user.Email! }, "Confirmation email link", confirmationLink!);
                _emailService.SendEmail(message);
                _context.Korisnici.Add(korisnik);
                await _context.SaveChangesAsync();
            return Ok("Uspesna registracija");
        }
        else
        {
            return BadRequest("This role doesn't exist.");
        }
        

    }
     [HttpGet]
     public  IActionResult TestEmail()
     {
        ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
            var message = new Message(new string[]{"peksi001@gmail.com"},"Test","<h1>Pokusaj poruke!</h1>");
        _emailService.SendEmail(message);
        return Ok();

    }
    [Route("ConfirmEmail")]
    [HttpGet()]
    public async Task<IActionResult> ConfirmEmail(string token, string email)
    {
        ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
        var user = await _userManager.FindByEmailAsync(email);
        if(user != null)
        {
            var result = await _userManager.ConfirmEmailAsync(user,token);
            if(result.Succeeded)
            {
                return Ok();
            }
            else
            return BadRequest();
        }
        else
            return BadRequest();
    }
     [HttpPost]
    [Route("login")]
    public async Task<IActionResult>Login([FromBody]LoginModel loginModel)
    {
        //checking the user ...
        var user = await _userManager.FindByNameAsync(loginModel.UserName);
        if(user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password))
        {
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var userRoles = await _userManager.GetRolesAsync(user);
            foreach(var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role,role));
            }
            var jwtToken= GetToken(authClaims);
            if(user.EmailConfirmed)
            return Ok(new{
                token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                expiration=jwtToken.ValidTo
            });
            else{
                return BadRequest("Please confirm your email");
            }
        }

        return Unauthorized();
    }
    private JwtSecurityToken GetToken(List<Claim> authClaims)
    {
        var authSigningKey= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
        var token = new JwtSecurityToken(
            issuer:_configuration["JWT:ValidIssuer"],
            audience:_configuration["JWT:ValidAudience"],
            expires:DateTime.Now.AddHours(1),
            claims:authClaims,
            signingCredentials:new SigningCredentials(authSigningKey,SecurityAlgorithms.HmacSha256)
            
        );
        return token;
    }
}

    //  }
   

   
