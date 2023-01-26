using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WDPR.Models;

namespace WDPR.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AgendaController : ControllerBase
    {
        private readonly IDbTheaterLaakContext _context;

        public AgendaController(IDbTheaterLaakContext context)
        {
            _context = context;
        }

        [HttpGet("voorstelling/{id}")]
        public async Task<ActionResult<IEnumerable<Agenda>>> GetAgendaOpVoorstelling(int id)
        {
            var agendas = _context.GetAgenda()
                .Where(a => a.VoorstellingId == id)
                .ToList();

            if (agendas == null)
            {
                return NotFound();
            }

            return agendas;
        }

        [HttpPost]
        public async Task<ActionResult<Agenda>> PostAgenda([FromBody]Agenda agenda)
        {
            var bestaatVoorstelling = _context.GetVoorstellingen()
            .Where(v => v.Id == agenda.VoorstellingId)
            .FirstOrDefault();

            if (bestaatVoorstelling == null)
            {
                return BadRequest("De voorstelling die je probeert toe te voegen bestaat niet. Check het Id dat je meegeeft opnieuw of voeg eerst de desbetreffende voorstelling toe.");
            }

            var bestaatZaal = _context.GetZalen()
            .Where(z => z.Id == agenda.ZaalId)
            .FirstOrDefault();

            if (bestaatZaal == null)
            {
                return BadRequest("De zaal met dit Id bestaat niet. Check nogmaals of de zaal die je wil toevoegen aan dit agendapunt bestaat.");
            }
            
            var alBezet = _context.GetAgenda().Where(a => a.ZaalId == agenda.ZaalId).Where(a => (a.StartDatumTijd >= agenda.StartDatumTijd && a.StartDatumTijd < agenda.EindDatumTijd) ||
            (a.EindDatumTijd > agenda.StartDatumTijd && a.EindDatumTijd <= agenda.EindDatumTijd) ||
            (a.StartDatumTijd <= agenda.StartDatumTijd && a.EindDatumTijd >= agenda.EindDatumTijd)).FirstOrDefault();

            if (alBezet != null)
            {
                return BadRequest("Er is al een voorstelling in deze zaal op de ingevoerde tijd.");
            }

            var voorstellingAlBezig = _context.GetAgenda().Where(a => a.VoorstellingId == agenda.VoorstellingId).Where(a => (a.StartDatumTijd >= agenda.StartDatumTijd && a.StartDatumTijd < agenda.EindDatumTijd) ||
            (a.EindDatumTijd > agenda.StartDatumTijd && a.EindDatumTijd <= agenda.EindDatumTijd) ||
            (a.StartDatumTijd <= agenda.StartDatumTijd && a.EindDatumTijd >= agenda.EindDatumTijd)).FirstOrDefault();

            if (voorstellingAlBezig != null)
            {
                return BadRequest("Deze voorstelling wordt op deze tijd al gehouden in een andere zaal.");
            }

            agenda.Kaartjes = new List<Kaartje>();

            _context.AddAgenda(agenda);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAgenda", new { id = agenda.Id }, agenda);
        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agenda>>> GetAgenda()
        {
            return _context.GetAgendas().ToList();
        }

        // GET: api/Agenda/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Agenda>> GetAgenda(int id)
        {
            var agenda = await _context.FindAgenda(id);

            if (agenda == null)
            {
                return NotFound();
            }

            return agenda;
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAlleAgendas()
        {
            var agendas = _context.GetAgendas().ToList();
            _context.RemoveAgendaRange(agendas);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgenda(int id)
        {
            var agenda = await _context.FindAgenda(id);
            if (agenda == null)
            {
                return NotFound();
            }

            _context.RemoveAgenda(agenda.Id);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool AgendaExists(int id)
        {
            return _context.GetAgendas().Any(e => e.Id == id);
        }
    }
}