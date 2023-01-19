using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WDPR.Models;

namespace WDPR.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AgendaController : ControllerBase
    {
        private readonly DbTheaterLaakContext _context;

        public AgendaController(DbTheaterLaakContext context)
        {
            _context = context;
        }

        [HttpGet("voorstelling/{id}")]
        public async Task<ActionResult<IEnumerable<Agenda>>> GetAgendaOpVoorstelling(int id)
        {
            var agendas = await _context.Agenda
                .Where(a => a.VoorstellingId == id)
                .ToListAsync();

            if (agendas == null)
            {
                return NotFound();
            }

            return agendas;
        }

        [HttpPost]
        public async Task<ActionResult<Agenda>> PostAgenda(Agenda agenda)
        {
            var bestaatVoorstelling = await _context.Voorstelling
            .Where(v => v.Id == agenda.VoorstellingId)
            .FirstOrDefaultAsync();

            if (bestaatVoorstelling == null)
            {
                return BadRequest("De voorstelling die je probeert toe te voegen bestaat niet. Check het Id dat je meegeeft opnieuw of voeg eerst de desbetreffende voorstelling toe.");
            }

            var bestaatZaal = await _context.Zaal
            .Where(z => z.Id == agenda.ZaalId)
            .FirstOrDefaultAsync();

            if (bestaatZaal == null)
            {
                return BadRequest("De zaal met dit Id bestaat niet. Check nogmaals of de zaal die je wil toevoegen aan dit agendapunt bestaat.");
            }
            
            var alBezet = await _context.Agenda.Where(a => a.ZaalId == agenda.ZaalId).Where(a => (a.StartDatumTijd >= agenda.StartDatumTijd && a.StartDatumTijd < agenda.EindDatumTijd) ||
            (a.EindDatumTijd > agenda.StartDatumTijd && a.EindDatumTijd <= agenda.EindDatumTijd) ||
            (a.StartDatumTijd <= agenda.StartDatumTijd && a.EindDatumTijd >= agenda.EindDatumTijd)).FirstOrDefaultAsync();

            if (alBezet != null)
            {
                return BadRequest("Er is al een voorstelling in deze zaal op de ingevoerde tijd.");
            }

            var voorstellingAlBezig = await _context.Agenda.Where(a => a.VoorstellingId == agenda.VoorstellingId).Where(a => (a.StartDatumTijd >= agenda.StartDatumTijd && a.StartDatumTijd < agenda.EindDatumTijd) ||
            (a.EindDatumTijd > agenda.StartDatumTijd && a.EindDatumTijd <= agenda.EindDatumTijd) ||
            (a.StartDatumTijd <= agenda.StartDatumTijd && a.EindDatumTijd >= agenda.EindDatumTijd)).FirstOrDefaultAsync();

            if (voorstellingAlBezig != null)
            {
                return BadRequest("Deze voorstelling wordt op deze tijd al gehouden in een andere zaal.");
            }

            _context.Agenda.Add(agenda);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAgenda", new { id = agenda.Id }, agenda);
        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agenda>>> GetAgenda()
        {
            return await _context.Agenda.ToListAsync();
        }

        // GET: api/Agenda/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Agenda>> GetAgenda(int id)
        {
            var agenda = await _context.Agenda.FindAsync(id);

            if (agenda == null)
            {
                return NotFound();
            }

            return agenda;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgenda(int id, Agenda agenda)
        {
            if (id != agenda.Id)
            {
                return BadRequest();
            }

            _context.Entry(agenda).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgendaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAlleAgendas()
        {
            var agendas = await _context.Agenda.ToListAsync();
            _context.Agenda.RemoveRange(agendas);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgenda(int id)
        {
            var agenda = await _context.Agenda.FindAsync(id);
            if (agenda == null)
            {
                return NotFound();
            }

            _context.Agenda.Remove(agenda);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool AgendaExists(int id)
        {
            return _context.Agenda.Any(e => e.Id == id);
        }
    }
}