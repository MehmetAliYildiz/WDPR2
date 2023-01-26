using BCrypt.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Collections.ObjectModel;
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

        public KaartjeController(IDbTheaterLaakContext context, IHubContext<BoekingUpdateHub> boekingHubContext)
        {
            _context = context;
            _boekingHubContext = boekingHubContext;
        }

        [HttpGet("{Id}")]
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
            if (kaartjeWithId.Gebruiker == null)
            {
                return BadRequest("Gebruiker mag niet leeg zijn");
            }
            if (gebruiker && kaartjeWithId.Gebruiker != null)
            {
                gebruikerMetMail = await _context.FindGebruikerByEmail(kaartjeWithId.Gebruiker);
                if (gebruikerMetMail == null)
                    return BadRequest("Geen gebruiker met email '" + kaartjeWithId.Gebruiker + "' gevonden");
            }
            #endregion

            var request = HttpContext.Request;
            Kaartje kaartje = new Kaartje()
            {
                Id = _context.GetKaartjes().Count() > 0 ? _context.GetKaartjes().Max(k => k.Id) + 1 : 0,
                Agenda = await _context.FindAgenda(kaartjeWithId.AgendaId),

                // Nieuwe bestelling wordt aangemaakt in de naam van gebruiker/bezoeker
                Bestelling = new Bestelling()
                {
                    Betaald = false,
                    PlaatsTijd = DateTime.Now,
                    Bedrag = 20D * kaartjeWithId.StoelIds.Count(),
                    BezoekerId = !gebruiker ? kaartjeWithId.Gebruiker : null,  // Of bezoekerId of gebruiker moet een waarde hebben
                    Gebruiker = gebruiker ? gebruikerMetMail : null            // boolean gebruiker geeft aan welke van de twee het moet zijn
                },

                // StoelKaartjes wordt leeg gelaten bij constructie
                StoelKaartjes = new Collection<StoelKaartje>(),

                // HashUsed geeft aan of het kaartje al gebruikt/gescand is door een bezoeker van het theater
                HashUsed = false
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
            _context.SaveChangesAsync();

            // Boekingpagina wordt geupdate met de stoelen die nu bezet zijn
            foreach (int stoelId in kaartjeWithId.StoelIds)
            {
                new BoekingUpdateHub(_boekingHubContext).SendStoelBezet(stoelId);
            }

            // Response
            return Ok(kaartje.Id);
        }

        // Deze functie zou aangeroepen worden door een kaartjesscanner en geeft terug of het kaartje geldig is
        [HttpGet("verify/{code}")]
        public IActionResult VerifyCode([FromRoute] string code)
        {
            foreach (Kaartje k in _context.GetKaartjes())
            {
                // Als de hash null is, is het kaartje nog uit een oudere versie van de database, dus sla hem maar over
                if (k.Hash == null || k.Hash == "") continue;

                // Er wordt gecheckt of ten eerste de kaartjescode van de scanner klopt met de hash die in de database staat
                if (BCrypt.Net.BCrypt.Verify(code, k.Hash))
                {
                    // Als dit waar is wordt ook gecheckt of de hash al een keer gebruikt is
                    if (k.HashUsed) return Ok(false);
                    else
                    {
                        // Zo niet returnt hij true en zet hij dat de hash een keer gebruikt is
                        k.HashUsed = true;
                        _context.SaveChangesAsync();
                        return Ok(true);
                    }
                }
            }

            // Als de kaartjescode niet correspondeert met een hash in de database, bestaat het kaartje niet
            return NotFound();
        }

    }

    public class KaartjeWithId
    {
        public int AgendaId { get; set; }
        public string Code { get; set; }
        public string? Gebruiker { get; set; }
        public List<int> StoelIds { get; set; }
    }
}