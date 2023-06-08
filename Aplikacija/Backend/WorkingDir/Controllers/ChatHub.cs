using Microsoft.AspNetCore.SignalR;
using Controllers.Utility;
namespace Controllers;

public class ChatHub : Hub
{

    //private ConnectionIdMapper<string> _mapper = new ConnectionIdMapper<string>();

    public async Task Test(string msg)
    {
        await Clients.All.SendAsync("Test",msg);
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