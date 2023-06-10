using System.Security.Claims;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Services.Abs;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class PorukaController : ControllerBase
{

    private IPorukaService _service;
    private IOglasService _oglasService;
    private IKorisnikService _korisnikService;
    private readonly IHubContext<ChatHub> _chatHub;
    public PorukaController(IPorukaService service,IHubContext<ChatHub> chatHub,IOglasService oglasService,IKorisnikService korisnikService)
    {
        _service = service;
        _chatHub = chatHub;
        _oglasService = oglasService;
        _korisnikService = korisnikService;
    }

    [HttpGet]
    [Route("VratiInbox/{id}")]
    public ActionResult VratiInbox(string id)
    {
        try{
 
            var inbox = _service.VratiInbox(id);
            var inboxDto = inbox.Select(p => new PorukaInbox
                         (
                            p.Chat.Id,
                            p.Chat.ZaOglas.Slike?.Count()!=0?p.Chat.ZaOglas.Slike?[0].Naziv:null,
                            p.Chat.ZaOglas.Ime,
                            p.Timestamp,
                            p.Chat.Stranka.UserName,
                            p.Chat.ZaOglas.Vlasnik.UserName,
                            p.Procitana
                    ) ).ToList(); 
          
            return Ok(inboxDto); 
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("VratiChat/{chatId}")]
    public ActionResult VratiChat(long chatId)
    {
        try
        {
            var Identity = (ClaimsIdentity)User?.Identity;
            var claim =   Identity?.FindFirst(ClaimTypes.Name);
            var myUsername=claim?.Value;
            var chat =_service.VratiChat(chatId);
            string receiverUsername = (myUsername!=null?myUsername == chat.Stranka.UserName ?
             chat.ZaOglas.Vlasnik.UserName : chat.Stranka.UserName:"")??"";
            var chatPogled = new ChatPogled(chat.Id,chat.ZaOglas.Ime,chat.ZaOglas.Id,receiverUsername,chat.Poruke);
            
            return Ok(chatPogled);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
        
    }

    [HttpPost]
    [Route("PosaljiPoruku")]
    public async Task<ActionResult> PosaljiPoruku(PorukaDto dto)
    {
        try{
            long id= _service.PosaljiPoruku(dto);
            
          var Identity = (ClaimsIdentity)User?.Identity;
            var claim =   Identity?.FindFirst(ClaimTypes.Name);
            var myUsername=claim?.Value;
            if(myUsername!=null)
            {
                //await _chatHub.Clients.Group(dto.ReceiverUsername).SendAsync("ReceiveMessage",myUsername,dto);
                //await _chatHub.Clients.Client("ppsNqunS__KCvWkkznZQQg").SendAsync("ReceiveMessage", myUsername, dto);
            }
                
            return Ok(id);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    [HttpPost]
    [Route("ObeleziProcitanim")]
    public ActionResult ObeleziProcitanim([FromBody] long[] ids)
    {
        try
        {
            _service.ObeleziProcitanim(ids);
            return Ok("Obelezene procitanim.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    [HttpPost]
    [Route("ObeleziProcitanom/{id}")]
    public ActionResult ObeleziProcitanom(long id)
    {
        try
        {
            _service.ObeleziProcitanom(id);
            return Ok("Obelezene procitanim.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("VratiChat/{oglasId}/{strankaId}")]
    public ActionResult VratiIliKreirajChat(long oglasId,string strankaId)
    {
        try
        {
            var Identity = (ClaimsIdentity)User?.Identity;
            var claim =   Identity?.FindFirst(ClaimTypes.Name);
            string? myUsername=claim?.Value;
            
            var chat = _service.VratiIliKreirajChat(oglasId, strankaId);
            string receiverUsername = (myUsername!=null?myUsername == chat.Stranka.UserName ?
             chat.ZaOglas.Vlasnik.UserName : chat.Stranka.UserName:"")??"";
            var chatPogled = new ChatPogled(chat.Id,chat.ZaOglas.Ime,chat.ZaOglas.Id,receiverUsername,chat.Poruke);
            return Ok(chatPogled);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("VratiNaslovnuPoruku/{chatId}")]
    public ActionResult VratiNaslovnuPoruku(long chatId)
    {
        try
        {
            var p=_service.VratiNaslovnuPoruku(chatId);
            var porukaDto = new PorukaInbox(
                            p.Chat.Id,
                            p.Chat.ZaOglas.Slike?.Count() != 0 ? p.Chat.ZaOglas.Slike?[0].Naziv : null,
                            p.Chat.ZaOglas.Ime,
                            p.Timestamp,
                            p.Chat.Stranka.UserName,
                            p.Chat.ZaOglas.Vlasnik.UserName,
                            p.Procitana
                    );
            return Ok(porukaDto);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}