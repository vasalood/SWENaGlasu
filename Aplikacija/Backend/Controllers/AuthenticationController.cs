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
using System.ComponentModel.DataAnnotations;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.AspNetCore.Authorization;

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
    [Route("Sign Up")]
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
    [Route("Login")]
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
    [Route("Forgot Password")]
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> ForgotPassword([Required]string  email)
    {
        ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
        var user = await _userManager.FindByEmailAsync(email);
        if(user != null)
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var ForgotPasswordLink=Url.Action(nameof(ResettPassword),"Authentication",new{token,email=user.Email},Request.Scheme);
             var message = new Message(new string[] { user.Email! }, "Forgot Password link", ForgotPasswordLink!);
                _emailService.SendEmail(message);
            return Ok($"Password Changed request is sent on Email {user.Email}");
           
        }
        else
        {
            return BadRequest("This email doesn't exist!");
        }
    }
    [HttpGet("reset-password")]
    public IActionResult ResettPassword(string token,string email){
        var model = new ResetPassword{Token = token, Email=email};
        return Ok(new {model});

    }
    [Route("Reset Password")]
    [HttpPost]
    public async Task<IActionResult> ResetPassword(ResetPassword resetPassword)
    {
        //ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
        var user = await _userManager.FindByEmailAsync(resetPassword.Email);
        if(user != null)
        {
            var resetPassResult = await _userManager.ResetPasswordAsync(user,resetPassword.Token,resetPassword.Password);
            if(!resetPassResult.Succeeded)
            {
                foreach(var error in resetPassResult.Errors)
                ModelState.AddModelError(error.Code, error.Description);

                return Ok(ModelState);
            }
            return Ok("Sifra je uspesno promenjena");
        }
        else
        {
            return BadRequest("This email doesn't exist!");
        }
    }
}

    
   

   
