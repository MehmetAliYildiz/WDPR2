using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WDPR.Models;

namespace WDPR.Controllers{

 [ApiController]
    [Route("[controller]")]
    public class StoelController : ControllerBase
    {
        private readonly DbTheaterLaakContext _context;

        public StoelController(DbTheaterLaakContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Zaal>> PostStoel(Stoel stoel)
        {
            _context.AddStoel(stoel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStoel", new { id = stoel.Id }, stoel);
        }


        [HttpGet]
        public ActionResult<IEnumerable<Stoel>> GetStoel()
        {
            return Ok(_context.GetStoelen());
        }

        // Post doen is niet RESTful
        [HttpPost("getSkFromKaartjes")]
        public ActionResult<IEnumerable<StoelKaartje>> GetSKFromKaartjes([FromBody] List<Kaartje> kaartjes)
        {
            var stoelKaartjes = _context.GetStoelKaartjes().ToList();
            var output = new List<StoelKaartje>();
            foreach (Kaartje kaartje in kaartjes)
            {
                var stoelKaartje = stoelKaartjes.Where(sk => sk.KaartjeId == kaartje.Id).FirstOrDefault();
                if (stoelKaartje == null) continue;
                output.Add(stoelKaartje);
            }

            output.ForEach(o => {
                o.Kaartje.StoelKaartjes = new List<StoelKaartje>();
                o.Kaartje.Bestelling = null;
                o.Kaartje.Agenda = null;
                o.Stoel.StoelKaartjes = new List<StoelKaartje>();
            });

            return output;
        }
         
        [HttpGet("{zaalId}/{agendaId}")]
        public IActionResult GetStoelenMetBeschikbaarheid(int zaalId, int agendaId)
        {
            var zaal = _context.GetZalen().Where(z => z.Id == zaalId);
            if (zaal.Count() < 1)
            {
                return NotFound("Zaal met ID '" + zaalId + "' niet gevonden");
            }

            var stoelen = zaal.First().Stoelen;
            var kaartjes = _context.GetKaartjes().ToList();
            var beschikbareStoelen = stoelen.Where
            (
                s => !_context.GetStoelKaartjes().Any(sk => sk.Stoel.Id == s.Id && kaartjes.Any(k =>
                {
                    if (k.Agenda == null) return false;
                    return k.Id == sk.KaartjeId && k.Agenda.Id == agendaId;
                }))
            );

            stoelen.ToList().ForEach(s => s.Status = "Bezet"); // Zet de status van -ALLE- stoelen in de zaal naar bezet
            beschikbareStoelen.ToList().ForEach(bs => bs.Status = "Vrij"); // Zet de status van beschikbare stoelen naar vrij
            stoelen.ForEach(s => s.StoelKaartjes = new List<StoelKaartje>());

            return Ok(stoelen);
        }
    }
}