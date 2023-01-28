using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using WDPR.Data;
using WDPR.Models;

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

        [HttpGet("getBestellingFromCode/{betaalCode}")]
        public IActionResult GetBestellingFromBezoeker([FromRoute] string betaalCode)
        {
            if (betaalCode == "" || betaalCode == null) return BadRequest("bezoekerId mag niet leeg zijn");

            return Ok(_context.GetBestellingen().Where(b => b.BetaalCode == betaalCode));
        }

        [HttpGet("payment/bezoeker/{bezoekerCode}")]
        public async Task<IActionResult> GetPaymentFromBezoeker([FromRoute] string bezoekerCode)
        {
            var bestellingen = _context.GetBestellingen().Where(b => b.BezoekerId == bezoekerCode && b.Betaald == true).ToList();
            if (!bestellingen.Any()) return NotFound("Geen open bestellingen gevonden voor bezoeker met Id '" + bezoekerCode + "'");
            return await GetPayment(bestellingen);
        }

        [HttpGet("payment/gebruiker/{gebruikerEmail}")]
        public async Task<IActionResult> GetPaymentFromFromGebruiker([FromRoute] string gebruikerEmail)
        {
            var bestellingen = _context.GetBestellingen().Where(b => {
                if (b.Gebruiker == null) return false;
                return b.Gebruiker.Email == gebruikerEmail && b.Betaald == false;
            }).ToList();
            if (!bestellingen.Any()) return NotFound("Geen open bestellingen gevonden voor gebruiker met Email '" + gebruikerEmail + "'");
            return await GetPayment(bestellingen);
        }

        private async Task<IActionResult> GetPayment(List<Bestelling> bestellingen)
        {
            using (var client = new HttpClient())
            {
                //var bestellingen = _context.GetBestellingen().Where(b => b.IP == ip);
                var values = new
                {
                    amount = bestellingen.Sum(b => b.Bedrag),
                    redirectUrl = "https://localhost:44469/paymentcomplete",
                    feedbackUrl = "http://20.77.66.80/bestelling/voltooid"
                };

                var json = JsonSerializer.Serialize(values);
                Console.WriteLine(json);
                var content = new StringContent(json, Encoding.UTF8, "text/plain");

                var response = await client.PostAsync("http://allyourgoods-transport-webapp-staging.azurewebsites.net/api/process", content);
                var responseString = await response.Content.ReadAsStringAsync();

                Console.WriteLine(responseString);

                var code = JsonSerializer.Deserialize<CodeWrapper>(responseString).Code;
                Console.WriteLine(code);
                bestellingen.ToList().ForEach(b => b.BetaalCode = code);
                _context.SaveChanges();

                return Ok(responseString);
            }
        }

        [HttpPost("voltooid")]
        public IActionResult Voltooid(CodeWrapper codeWrapper)
        {
            var bestellingen = _context.GetBestellingen().Where(b => b.BetaalCode == codeWrapper.Code);
            bestellingen.ToList().ForEach(b =>
            {
                b.Betaald = true;
            });
            _context.SaveChangesAsync();

            return Ok(codeWrapper.Code);
        }
    }

    public class CodeWrapper
    {
        [JsonPropertyName("code")]
        public string Code { get; set; }
    }
}
