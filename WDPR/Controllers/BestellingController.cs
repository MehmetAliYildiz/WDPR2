using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using WDPR.Data;

namespace WDPR.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BestellingController : ControllerBase
    {
        private readonly IDbTheaterLaakContext _context;

        public BestellingController(IDbTheaterLaakContext context)
        {
            _context = context;
        }

        [HttpGet("ip/{ip}")]
        public async Task<IActionResult> GetPaymentFromIP([FromRoute] string ip)
        {
            using (var client = new HttpClient())
            {
                var bestellingen = _context.GetBestellingen().Where(b => b.IP == ip);
                var values = new
                {
                    amount = bestellingen.Sum(b => b.Bedrag),
                    redirectUrl = "https://77.172.8.98:44469/paymentcomplete",
                    feedbackUrl = "https://77.172.8.98:7260/bestelling/voltooid"
                };

                var json = JsonSerializer.Serialize(values);
                Console.WriteLine(json);
                //var content = new StringContent(json, Encoding.UTF8, "application/json");

                //var response = await client.PostAsync("https://example.com/api/values", content);
                //var responseString = await response.Content.ReadAsStringAsync();

                //Console.WriteLine(responseString);

                //bestellingen.ToList().ForEach(b => b.BetaalCode = <>);
                //_context.SaveChangesAsync();

                return Ok();
            }
        }

        [HttpGet("voltooid")]
        public IActionResult Voltooid([FromBody] string code)
        {
            var bestellingen = _context.GetBestellingen().Where(b => b.BetaalCode == code);
            bestellingen.ToList().ForEach(b => {
                b.Betaald = true;
                b.BetaalCode = null;
            });
            _context.SaveChangesAsync();

            return Ok();
        }
    }
}
