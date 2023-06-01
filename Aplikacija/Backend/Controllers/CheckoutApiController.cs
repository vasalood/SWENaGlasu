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
using Stripe.Checkout;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class CheckoutApiController:ControllerBase
{
    [Route("BePremium")]
    [HttpPost]
    public ActionResult CreateCheckoutSesssion()
    {
       return new StatusCodeResult(200);
        var options = new SessionCreateOptions()
        {
            LineItems = new List<SessionLineItemOptions>()
            {
                new SessionLineItemOptions()
                {
                    Price = "price_1NDosOIqJ8VSwXB7Gog62f8w",
                    Quantity=1
                }
            },
            PaymentMethodTypes = new List<string>()
            {
                "card"
            },
            Mode = "payment"
           // SuccessUrl=domain +"/success.html",
            //CancelUrl=domain+"/cancel.html"
        };
        var service = new SessionService();
        Session session = service.Create(options);
        Response.Headers.Add("Location",session.Url);
        return new StatusCodeResult(303);
    }
}