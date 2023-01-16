using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WDPR.Models;

namespace WDPR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoorstellingController : ControllerBase
    {
        private readonly DbTheaterLaakContext _context;

        public VoorstellingController(DbTheaterLaakContext context)
        {
            _context = context;
        }

        // GET: api/Voorstelling
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Voorstelling>>> GetVoorstelling()
        {
            return await _context.Voorstelling.ToListAsync();
        }

        // GET: api/Voorstelling/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Voorstelling>> GetVoorstelling(int id)
        {
            var voorstelling = await _context.Voorstelling.FindAsync(id);

            if (voorstelling == null)
            {
                return NotFound();
            }

            return voorstelling;
        }

        // PUT: api/Voorstelling/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVoorstelling(int id, Voorstelling voorstelling)
        {
            if (id != voorstelling.Id)
            {
                return BadRequest();
            }

            _context.Entry(voorstelling).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VoorstellingExists(id))
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

        [HttpPost]
        public async Task<ActionResult<Voorstelling>> PostVoorstelling(Voorstelling voorstelling)
        {
            voorstelling.ZaalId = null;
            _context.Voorstelling.Add(voorstelling);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVoorstelling", new { id = voorstelling.Id }, voorstelling);
        }

        // DELETE: api/Voorstelling/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoorstelling(int id)
        {
            var voorstelling = await _context.Voorstelling.FindAsync(id);
            if (voorstelling == null)
            {
                return NotFound();
            }

            _context.Voorstelling.Remove(voorstelling);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        [HttpPut("voegZaalToe")]
        public IActionResult voegZaalToe(int voorstellingId, int zaalId)
        {
            var voorstelling = _context.Voorstelling.Find(voorstellingId);
            if (voorstelling == null)
            {
                return NotFound();
            }

            var zaal = _context.Zaal.Find(zaalId);
            if (zaal == null)
            {
                return NotFound();
            }

            var existingVoorstelling = _context.Voorstelling.Where(x =>
            x.ZaalId == zaalId &&
            ((x.StartTime >= voorstelling.StartTime && x.StartTime < voorstelling.EndTime) ||
            (x.EndTime > voorstelling.StartTime && x.EndTime <= voorstelling.EndTime) ||
            (x.StartTime <= voorstelling.StartTime && x.EndTime >= voorstelling.EndTime))).ToList();
            
            if (existingVoorstelling.Count > 0)
            {
                return BadRequest("There is already a voorstelling at that time in this zaal");
            }       

            voorstelling.ZaalId = zaalId;
            _context.SaveChanges();

            return Ok();
        }
        

        private bool VoorstellingExists(int id)
        {
            return _context.Voorstelling.Any(e => e.Id == id);
        }
    }
}
