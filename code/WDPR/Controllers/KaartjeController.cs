using BCrypt.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.CodeDom;
using System.Collections.ObjectModel;
using System.Text.Json;
using WDPR.Data;
using WDPR.Models;

namespace WDPR.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KaartjeController : ControllerBase
    {
        private readonly IDbTheaterLaakContext _context;
        private readonly IHubContext<BoekingUpdateHub> _boekingHubContext;
        private readonly UserManager<Gebruiker> _userManager;

        public KaartjeController(IDbTheaterLaakContext context, IHubContext<BoekingUpdateHub> boekingHubContext, UserManager<Gebruiker> userManager)
        {
            _context = context;
            _boekingHubContext = boekingHubContext;
            _userManager = userManager;
        }

        [HttpGet("{id}")]
        public IActionResult GetKaartje(int id)
        {
            var kaartje = _context.GetKaartjes().Where(k => k.Id == id);

            return kaartje.Any() ? Ok(kaartje.First()) : NotFound();
        }

        [HttpPost("gebruiker")]
        public async Task<IActionResult> PostKaartjeGebruiker([FromBody] KaartjeWithId kaartjeWithId)
        {
            return await PostKaartje(kaartjeWithId, true);
        }

        [HttpPost("bezoeker")]
        public async Task<IActionResult> PostKaartjeBezoeker([FromBody] KaartjeWithId kaartjeWithId)
        {
            return await PostKaartje(kaartjeWithId, false);
        }

        private async Task<IActionResult> PostKaartje(KaartjeWithId kaartjeWithId, bool gebruiker)
        {
            Gebruiker? gebruikerMetMail = null; // Assignment staat bij guard clauses voor efficientie
            #region Guard Clauses
            if (!_context.GetStoelen().Any(s => kaartjeWithId.StoelIds.Any(sid => sid == s.Id)))
            {
                return BadRequest("Een van de stoelen was niet gevonden");
            }
            if (kaartjeWithId.StoelIds.Count() >= 25)
            {
                return BadRequest("Maximaal 25 stoelen kunnen tegelijk geboekt worden");
            }
            if (gebruiker && kaartjeWithId.GebruikerEmail == null)
            {
                return BadRequest("GebruikerEmail mag niet leeg zijn");
            }
            if (!gebruiker && kaartjeWithId.BezoekerId == null)
            {
                return BadRequest("BezoekerId mag niet leeg zijn");
            }
            if (gebruiker && kaartjeWithId.GebruikerEmail != null)
            {
                gebruikerMetMail = await _context.FindGebruikerByEmail(kaartjeWithId.GebruikerEmail);
                if (gebruikerMetMail == null)
                    return BadRequest("Geen gebruiker met email '" + kaartjeWithId.GebruikerEmail + "' gevonden");
            }
            #endregion
            Console.WriteLine(JsonSerializer.Serialize(kaartjeWithId));
            var request = HttpContext.Request;
            Kaartje kaartje = new Kaartje()
            {
                Agenda = await _context.FindAgenda(kaartjeWithId.AgendaId),

                // Nieuwe bestelling wordt aangemaakt in de naam van gebruiker/bezoeker
                Bestelling = new Bestelling()
                {
                    Betaald = false,
                    PlaatsTijd = DateTime.Now,
                    Bedrag = 20D * kaartjeWithId.StoelIds.Count(),
                    BezoekerId = !gebruiker ? kaartjeWithId.BezoekerId : null,  // Of bezoekerId of gebruiker moet een waarde hebben
                    Gebruiker = gebruiker ? gebruikerMetMail : null,           // boolean gebruiker geeft aan welke van de twee het moet zijn
                    Type = "Kaartje"
                },

                // StoelKaartjes wordt leeg gelaten bij constructie
                StoelKaartjes = new Collection<StoelKaartje>(),

                // De code wordt gescand bij het theater om te zien of het kaartje echt bestaat
                Code = Guid.NewGuid().ToString().Substring(0, 8),

                // CodeUsed geeft aan of het kaartje al gebruikt/gescand is door een bezoeker van het theater
                CodeUsed = false
            };

            // Context krijgt alvast het kaartje in deze fase
            _context.AddKaartje(kaartje);

            // Stoelen toevoegen voor het kaartje
            foreach (int stoelId in kaartjeWithId.StoelIds)
            {
                Stoel stoel = await _context.FindStoel(stoelId);
                _context.AddStoelKaartje(new StoelKaartje
                {
                    Stoel = stoel,
                    StoelId = stoel.Id,
                    Kaartje = kaartje,
                    KaartjeId = kaartje.Id
                });
            }

            // Kaartje en bestelling wordt tegelijk opgeslagen
            _context.SaveChanges();

            // Boekingpagina wordt geupdate met de stoelen die nu bezet zijn
            foreach (int stoelId in kaartjeWithId.StoelIds)
            {
                new BoekingUpdateHub(_boekingHubContext).SendStoelBezet(stoelId);
            }

            // Response
            return Ok(kaartje.Id);
        }

        // Post maken is niet RESTful, maar het kan eenmaal niet anders als we een lijst in de body willen
        [HttpPost("kaartjesFromBestellingen")]
        public IActionResult GetKaartjesFromBestellingen([FromBody] List<Bestelling> bestellingen)
        {
            var kaartjes = _context.GetKaartjes().Where(k => bestellingen.Any(b => b.Id == k.Bestelling.Id)).ToList();
            if (!kaartjes.Any())
            {
                return NotFound("Geen kaartjes zijn verbonden aan deze bestellingen");
            }

            kaartjes.ForEach(k =>
            {
                if (k.Agenda == null) return;
                k.Agenda.Kaartjes = new List<Kaartje>();
            });

            return Ok(kaartjes);
        }

        [HttpPut("put/{code}")]
        public IActionResult PutCode([FromRoute] string code, [FromBody] Kaartje kaartje)
        {
            var contextKaartje = _context.FindKaartje(kaartje.Id);
            if (contextKaartje == null)
            {
                return NotFound("Kaartje bestaat niet ;-;");
            }
            if (code == null || code == "")
            {
                return BadRequest("Code mag niet leeg zijn");
            }

            contextKaartje.Code = code;
            _context.SaveChanges();

            return Ok();
        }

        // Deze functie zou aangeroepen worden door een kaartjesscanner en geeft terug of het kaartje geldig is
        [HttpGet("verify/{code}")]
        public IActionResult VerifyCode([FromRoute] string code)
        {
            foreach (Kaartje k in _context.GetKaartjes())
            {
                // Als de code null is, is het kaartje nog uit een oudere versie van de database, dus sla hem maar over
                if (k.Code == null || k.Code == "") continue;

                // Er wordt gecheckt of ten eerste de kaartjescode van de scanner klopt met de code die in de database staat
                if (k.Code == code)
                {
                    // Als dit waar is wordt ook gecheckt of de code al een keer gebruikt is
                    if (k.CodeUsed) return Ok(false);
                    else
                    {
                        // Zo niet returnt hij true en zet hij dat de code een keer gebruikt is
                        k.CodeUsed = true;
                        _context.SaveChangesAsync();
                        return Ok(true);
                    }
                }
            }

            // Als de kaartjescode niet correspondeert met een code in de database, bestaat het kaartje niet
            return NotFound();
        }



        [HttpGet("kaartjeBijGebruiker/{email}")]
        public async Task<IActionResult> KaartjeBijGebruikerAsync(string email)
        {
            var user = await _context.FindGebruikerByEmail(email);
            if(user == null)
            return NotFound("user not found");

            var bestellingOpId = _context.GetBestellingen().Where(b => {
                if(b.Gebruiker == null){
                    return false;
                }
                return b.Gebruiker.Id == user.Id;
            });
            if (!bestellingOpId.Any())
            {
                return NotFound("er zijn geen kaartjes gekoppeld aan je account");
            }

            var kResult = GetKaartjesFromBestellingen(bestellingOpId.ToList());
            if (!(kResult is OkObjectResult))
            {
                return BadRequest("Kaartjes from bestellingen gaf een error");
            }

            var kaartjes = _context.GetKaartjes().Where(k => bestellingOpId.Any(b => b.Id == k.Bestelling.Id)).ToList();
            if (!kaartjes.Any())
            {
                return NotFound("Geen kaartjes zijn verbonden aan deze bestellingen");
            }

            kaartjes.ForEach(k => k.Agenda.Kaartjes = new List<Kaartje>());
            return Ok(kaartjes);
        }
 
     }

       

    public class KaartjeWithId
    {
        public int AgendaId { get; set; }
        public string Code { get; set; }
        public string? GebruikerEmail { get; set; }
        public string? BezoekerId { get; set; }
        public List<int> StoelIds { get; set; }
    }
}