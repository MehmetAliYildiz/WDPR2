using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.FileProviders;
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

        [HttpGet("{id}")]
        public IActionResult GetKaartje(int id)
        {
            var kaartje = _context.GetKaartjes().Where(k => k.Id == id);

            return kaartje.Any() ? Ok(kaartje.First()) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> PostKaartje([FromBody] KaartjeWithId kaartjeWithId)
        {
            if (!_context.GetStoelen().Any(s => kaartjeWithId.StoelIds.Any(sid => sid == s.Id)))
            {
                return BadRequest("Een van de stoelen was niet gevonden");
            }
            //if (!_context.GetBestellingen().Where(b => b.Id == kaartjeWithId.BestellingId).Any())
            //{
            //    return BadRequest("Bestelling met ID '" + kaartjeWithId.BestellingId + "' niet gevonden");
            //}

            Kaartje kaartje = new Kaartje()
            {
                Id = _context.GetKaartjes().Max(k => k.Id) + 1,
                Agenda = await _context.FindAgenda(kaartjeWithId.AgendaId),
                Bestelling = new Bestelling()
                {
                    Betaald = false,
                    PlaatsTijd = DateTime.Now,
                    Bedrag = (20D * kaartjeWithId.StoelIds.Count())
                },
                StoelKaartjes = new Collection<StoelKaartje>()
            };

            _context.AddKaartje(kaartje);
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
            _context.SaveChangesAsync();

            foreach (int stoelId in kaartjeWithId.StoelIds)
            {
                new BoekingUpdateHub(_boekingHubContext).SendStoelBezet(stoelId);
            }

            return Ok(kaartje.Id);
        }
    }
}
