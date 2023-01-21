using Microsoft.AspNetCore.SignalR;
using WDPR.Models;

namespace WDPR.Data
{
    public class BoekingUpdateHub : Hub
    {
        protected IHubContext<BoekingUpdateHub> _context;

        public BoekingUpdateHub(IHubContext<BoekingUpdateHub> context)
        {
            this._context = context;
        }
        public async Task SendStoelBezet(int stoelId)
        {
            await _context.Clients.All.SendAsync("ReceiveData", "{ \"stoelId\":" + stoelId + ", \"status\": \"Bezet\" }");
        }

        public async Task SendStoelVrij(int stoelId)
        {
            await _context.Clients.All.SendAsync("ReceiveData", "");
        }
    }
}
