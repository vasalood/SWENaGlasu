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
using Microsoft.AspNetCore.Authentication;
namespace Backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using Contracts;
[ApiController]
[Route("[controller]")]
public class AuthenticationController:ControllerBase
{
    private readonly UserManager<Korisnik> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _configuration;
    private readonly  NaGlasuContext _context ;
    private readonly SignInManager<Korisnik> _signInManager;
private readonly IStripeAppService _stripeService;
    public AuthenticationController(UserManager<Korisnik> userManager,RoleManager<IdentityRole> roleManager
    ,IConfiguration configuration,IEmailService emailService,NaGlasuContext context, SignInManager<Korisnik> signInManager,IStripeAppService stripeService)
    {
        _userManager=userManager;
        _roleManager=roleManager;
        _configuration=configuration;
       _emailService=emailService;
       _context=context;
       _signInManager=signInManager;
       _stripeService=stripeService;
       
    }
    [HttpPost]
    [Route("UploadImage")]
    public async Task<IActionResult>UploadImage([FromForm]IFormFile slika,[FromForm]string userName)
    {
        Korisnik korisnik = await _userManager.FindByNameAsync(userName);
        if(korisnik == null)
        return BadRequest("Nema ga");
        using (var memoryStream = new MemoryStream())
            {
                slika.CopyTo(memoryStream);
                byte[] imageBytes = memoryStream.ToArray();
                 string base64String = Convert.ToBase64String(imageBytes);
                
                korisnik.Slika=base64String;
               await _userManager.UpdateAsync(korisnik);
            }
            return Ok(korisnik);
    }
    [Route("SignUp")]
    [HttpPost]
    public async Task<IActionResult>Register([FromBody]RegisterModel korisnik)
    {
        
        ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
        var userExist= await _userManager.FindByEmailAsync(korisnik.Email);
        if(userExist!=null)
        {
            return BadRequest("Email vec postoji.");
        }
       /* var userExist2 =await _userManager.FindByEmailAsync(korisnik.UserName);
          if(userExist2!=null)
        {
            return BadRequest("UserName vec postoji.");
        }*/
       
        Korisnik user = new()
        {
            Email = korisnik.Email,
            SecurityStamp=Guid.NewGuid().ToString(),
            UserName=korisnik.UserName,
            Ime=korisnik.Ime,
            Prezime=korisnik.Prezime,
            Adresa=korisnik.Adresa,
            Telefon=korisnik.Telefon,
            Uplata= 0
        };
        if(await _roleManager.RoleExistsAsync("User"))
        {
             var result = await _userManager.CreateAsync(user,korisnik.Password);
            if(!result.Succeeded)
             {
             var errorMessages = string.Join(", ", result.Errors.Select(e => e.Description));
            return BadRequest($"Neuspesna registracija: {errorMessages}");
             }
            await _userManager.AddToRoleAsync(user,"User");
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink=Url.Action(nameof(ConfirmEmail),"Authentication", new {token,email=user.Email}, Request.Scheme);
            var message = new Message(new string[] { user.Email! }, "Confirmation email link", confirmationLink!);
                _emailService.SendEmail(message);
               // _context.Korisnici.Add(korisnik);
                //await _context.SaveChangesAsync();
            return Ok("Confirmation link je poslat na mejl adresu, molimo Vas potvrdite link.");
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
        // await _userManager.SetLockoutEndDateAsync(user,DateTimeOffset.UtcNow.AddMonths(1));
        //checking the user ...
        var user = await _userManager.FindByNameAsync(loginModel.UserName);
        if(user == null)
        {
            return BadRequest("Nepostojeći username");
        }
        else if(await _userManager.CheckPasswordAsync(user, loginModel.Password))
        {
            if(await _userManager.IsLockedOutAsync(user))
            {
                return BadRequest("Vas nalog je suspendovan !");
            }
            
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
           // if(user.EmailConfirmed)
            return Ok(new{
                token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                expiration=jwtToken.ValidTo,
            });
           // else{
            //    return BadRequest("Please confirm your email");
           // }
        }
        else
        return BadRequest("Neispravan password");
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
    [Route("ForgotPassword/{email}")]
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> ForgotPassword(string  email)
    {
        ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
        var user = await _userManager.FindByEmailAsync(email);
        if(user != null)
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var ForgotPasswordLink=Url.Action(nameof(ResettPassword),"Authentication",new{token,email=user.Email},Request.Scheme);
             var message = new Message(new string[] { user.Email! }, "Forgot Password link", ForgotPasswordLink!);
                _emailService.SendEmail(message);
            return Ok($"Poštovani {user.Ime},");
           
        }
        else
        {
            return BadRequest("Ovaj email ne postoji");
        }
    }
    [HttpGet("reset-password")]
    public IActionResult ResettPassword(string token,string email){
        var model = new ResetPassword{Token = token, Email=email};
        return Ok(new {model});

    }
    [Route("Reset Password")]
    [HttpPost]
    public async Task<IActionResult> ResetPassword([FromBody]ResetPassword resetPassword)
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
    [Authorize(Roles ="Admin, Moderator, PremiumUser, User")]
    [Route("Get Korisnik")]
    [HttpGet]
    public async Task<IActionResult>GetKorisnikByUserName(string userName)
    {
        var korisnik =await _userManager.FindByNameAsync(userName);
        if(korisnik != null)
        {
        //     Korisnik user = new()
        // {
        //     Email = korisnik.Email,
        //     SecurityStamp=Guid.NewGuid().ToString(),
        //     UserName=korisnik.UserName,
        //     Ime=korisnik.Ime,
        //     Prezime=korisnik.Prezime,
        //     Adresa=korisnik.Adresa,
        //     Telefon=korisnik.Telefon,
        //     Uplata= korisnik.Uplata

        // };
            RegisterModel model = new(){
                Ime = korisnik.Ime,
                Prezime=korisnik.Prezime,
                UserName=korisnik.UserName,
              Adresa=korisnik.Adresa,
            Telefon=korisnik.Telefon,
             Uplata= korisnik.Uplata,
              Email = korisnik.Email
            };
            return Ok(model);
        }
        else
        {
            return BadRequest("Ne postoji korisnik sa tim userNameom");
        }
    }
    [Authorize(Roles ="Admin")]
    [Route("PromeniRolu/{userName}")]
    [HttpPut]
    public async Task<IActionResult>ChangeRole(string userName)
    {
       
        var userExist = await _userManager.FindByNameAsync(userName);
        
        if(userExist==null)
        {
            return BadRequest("User ne postoji!");
        }
        else
        {
           var result = await _userManager.RemoveFromRoleAsync(userExist,"User");
                if(result.Succeeded)
                {
                    result=await _userManager.AddToRoleAsync(userExist,"Moderator");
                    return Ok("Uspesno promenjena rola");
                }
                else
                {
                    return BadRequest("Neuspesna promena role");
                }
        }
    }
    [Authorize(Roles ="Admin, Moderator")]
    [Route("SuspendujKorisnika/{userName}")]
    [HttpPut]
    public async Task<IActionResult>SuspendUser(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if(user != null)
        {
            await _userManager.SetLockoutEndDateAsync(user,DateTimeOffset.MaxValue);
              await _signInManager.SignOutAsync();
            return Ok("Uspesno blokiran korisnik!");
        }
        else
        {
            return BadRequest("Neuspesno blokiran korisnik");
        }
    }
    [Authorize(Roles ="Admin, Moderator")]
    [Route("UnBlockUser/{userName}")]
    [HttpPut]
    public async Task<IActionResult>UnSuspendUser(string userName)
    {
         var user = await _userManager.FindByNameAsync(userName);
        if(user != null)
        {
            await _userManager.SetLockoutEndDateAsync(user,DateTimeOffset.UtcNow);
            
            return Ok("Uspesno Odblokiran korisnik!");
        }
        else
        {
            return BadRequest("Neuspesno odblokiran korisnik");
        }
    }
    [Authorize(Roles ="Admin, Moderator")]
    [Route("SuspendUserOnTime/{userName}")]
    [HttpPut]
    public async Task<IActionResult>SuspendUserOnTime(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        if(user != null)
        {
            await _userManager.SetLockoutEndDateAsync(user,DateTimeOffset.UtcNow.AddMonths(1));
              await _signInManager.SignOutAsync();
            return Ok("Uspesno blokiran korisnik!");
        }
        else
        {
            return BadRequest("Neuspesno blokiran korisnik");
        }
    }
[Authorize(Roles ="Admin, Moderator, PremiumUser, User")]   
 [Route("UpdateUser/{userName}/{Ime}/{Prezime}/{Adresa}/{Telefon}")]
    [HttpPut]
    public async Task<IActionResult>UpdateUser(string userName,string Ime, string Prezime,string Adresa, string Telefon)
    {
        Korisnik userExist=await _userManager.FindByNameAsync(userName);
        if(userExist== null)
        {
            return BadRequest("User ne postoji");
        }
        else
        {
            userExist.Ime=Ime;
            userExist.Prezime=Prezime;
            userExist.Adresa=Adresa;
            userExist.Telefon=Telefon;
           await _userManager.UpdateAsync(userExist);
            return Ok("Uspesno promenjen korisnik!");
            
        }
    }
    [Authorize(Roles ="Admin, Moderator, PremiumUser, User ")]
    [Route("LogOut")]
    [HttpPost]
    public async Task<IActionResult>LogOut()
    {
         if (User.Identity.IsAuthenticated)
    {
        var userName = User.Identity.Name;

        Korisnik korisnik = await _userManager.FindByNameAsync(userName);

        if (korisnik != null)
        {
            
            await HttpContext.SignOutAsync();
         
            return Ok("Uspesno ste odjavljeni");
        }
    }

    return BadRequest();
    }
    [Authorize(Roles ="Admin, Moderator, PremiumUser, User ")]
    [Route("GetUserName")]
    [HttpGet]
    public async Task<IActionResult>GetUserName()
    {
       var Identity = (ClaimsIdentity)User.Identity;
       var claim =   Identity.FindFirst(ClaimTypes.Name);
       var userName=claim.Value;
       return Ok(userName);
       return BadRequest("Ne postoji");
    }
    [Authorize(Roles ="Admin, Moderator, PremiumUser, User ")]
    [Route("GetUser")]
    [HttpGet]
    public async Task<IActionResult>GetUser()
    {
       var Identity = (ClaimsIdentity)User.Identity;
       var claim = Identity.FindFirst(ClaimTypes.Name);
       var userName=claim.Value;

       Korisnik korisnik = await _userManager.FindByNameAsync(userName);
       IList<string> rola = await _userManager.GetRolesAsync(korisnik);
       RegisterModel model = new(){
                Ime = korisnik.Ime,
                Prezime=korisnik.Prezime,
                UserName=korisnik.UserName,
              Adresa=korisnik.Adresa,
            Telefon=korisnik.Telefon,
             Uplata= korisnik.Uplata,
              Email = korisnik.Email,
              Rola=rola[0],
              Slika=korisnik.Slika
            };
       return Ok(model);
    }
    [Authorize(Roles ="Admin, Moderator, PremiumUser, User")]
    [Route("GetAllUsers")]
    [HttpGet]
    public async Task<IActionResult>GetAllUsers()
    {
        List<Korisnik> korisnici =await _userManager.Users.ToListAsync();
        List<AdminVrati> registrovani = new List<AdminVrati>();
        bool suspendzauvek,suspendOnTime;
        foreach(Korisnik korisnik in korisnici)
        {
            var a = await _userManager.GetLockoutEndDateAsync(korisnik);
            if(a==DateTimeOffset.MaxValue)
            {
                suspendzauvek=true;
            }
            else
            suspendzauvek=false;
            if(a>DateTimeOffset.UtcNow)
            {
                suspendOnTime=true;
            }
            else
            suspendOnTime=false;
                   IList<string> rola = await _userManager.GetRolesAsync(korisnik);
            AdminVrati model = new(){
                 Ime = korisnik.Ime,
                Prezime=korisnik.Prezime,
                UserName=korisnik.UserName,
              Adresa=korisnik.Adresa,
            Telefon=korisnik.Telefon,
             Uplata= korisnik.Uplata,
              Email = korisnik.Email,
              Rola=rola[0],
              Slika=korisnik.Slika,
              SuspendOnTime=suspendOnTime,
              SuspendForEver=suspendzauvek
            };
            registrovani.Add(model);
        }
        return Ok(registrovani);
        
    }
    [Authorize(Roles ="Admin, Moderator, PremiumUser, User")]
    [Route("GetUserView/{userName}")]
    [HttpGet]
    public async Task<IActionResult>GetUserView(string userName)
    {
Korisnik korisnik = await _userManager.FindByNameAsync(userName);
  RegisterModel model = new(){
                Ime = korisnik.Ime,
                Prezime=korisnik.Prezime,
                UserName=korisnik.UserName,
                Adresa=korisnik.Adresa,
                Telefon=korisnik.Telefon,
                Email = korisnik.Email,
                Rola="",
                Slika=korisnik.Slika
            };
       return Ok(model);
    }
    
     [Authorize(Roles ="Admin, Moderator, PremiumUser, User")]
    [Route("IzmeniSifru/{userName}/{novaSifra}")]
    [HttpPut]
    public async Task<IActionResult>IzmeniSifru(string userName,string novaSifra)
    {
        Korisnik korisnik = await _userManager.FindByNameAsync(userName);
        if(korisnik!=null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(korisnik);
                var resetPassResult = await _userManager.ResetPasswordAsync(korisnik,token,novaSifra);
            if(!resetPassResult.Succeeded)
            {
                return BadRequest("Sifra mora sadrzati jedno veliko slovo, jednu cifru i jedan specijalni karakter!");
            }
            else
            return Ok("Sifra je uspesno promenjena");
            }
        else 
                return BadRequest("Korisnik ne postoji");
    }
        [Route("AddCustomer")]
        [HttpPost]
        public async Task<ActionResult<StripeCustomer>> AddStripeCustomer(
            [FromBody] AddStripeCustomer customer,
            CancellationToken ct)
        {
            StripeCustomer createdCustomer = await _stripeService.AddStripeCustomerAsync(
                customer,
                ct);

            return StatusCode(StatusCodes.Status200OK, createdCustomer);
        }
        [Route("AddPayment")]
        [HttpPost()]
        public async Task<ActionResult<StripePayment>> AddStripePayment(
            [FromBody] AddStripePayment payment,
            CancellationToken ct)
        {
            StripePayment createdPayment = await _stripeService.AddStripePaymentAsync(
                payment,
                ct);

            return StatusCode(StatusCodes.Status200OK, createdPayment);
        }
    
}