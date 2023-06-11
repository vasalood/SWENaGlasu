using Domain.Models;
using Microsoft.AspNetCore.SignalR;
namespace Controllers;
using Newtonsoft.Json;
public class ChatHub : Hub
{

    //private ConnectionIdMapper<string> _mapper = new ConnectionIdMapper<string>();

    public async Task Test(string msg)
    {
        await Clients.All.SendAsync("Test",msg);
    }

    public async Task SendMessage(object dto) //PorukaDto
    {
        string? name = Context.User?.Identity?.Name;
        if(name==null)
            throw new ArgumentNullException("name is null!");
         dynamic obj = JsonConvert.DeserializeObject(dto.ToString());
                string prop = obj.receiverUsername;
           /*  using(FileStream fs = new FileStream("connectionLog.txt",FileMode.Append))
            {
                using(TextWriter tw = new StreamWriter(fs))
                {
               
                tw.WriteLine($"Obj received: {dto.ToString()}");
                tw.WriteLine($"Primer: {prop}");
                tw.Flush();
                }
            } */
        await Clients.Group(prop).SendAsync("ReceiveMessage", name, dto);
    }

    public async Task ConfirmOrRejectContract(string receiverUsername,long id,bool value)
    {
        string? name = Context.User?.Identity?.Name;
        if(name==null)
            throw new ArgumentNullException("name is null");
        await Clients.Group(receiverUsername).SendAsync("UpdateContract", id, value);
    }

    public async Task SendMessageTest(string test)
    {
               string? name = Context.User?.Identity?.Name;
        if(name==null)
            throw new ArgumentNullException("name is null!");
        await Clients.All.SendAsync("ReceiveMessageTest", name, test);
    }

    public async override Task OnConnectedAsync()
        {

        string? name = Context.User?.Identity?.Name;
        if(name==null)
            name = "testing";
        if(name!=null)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, name);

            using(FileStream fs = new FileStream("connectionLog.txt",FileMode.Append))
            {
                using(TextWriter tw = new StreamWriter(fs))
                {
                    tw.WriteLine($"Connection established, name: {name}, connectionId: {Context.ConnectionId}");
                    tw.Flush();
                }
            }
            await base.OnConnectedAsync();
        }

       
    }


}