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
    public class bandController : ControllerBase
    {
        private readonly DbTheaterLaakContext _context;

        public bandController(DbTheaterLaakContext context)
        {
            _context = context;
        }

        // GET: api/band
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Band>>> GetBand()
        {
            return await _context.Band.ToListAsync();
        }

        // GET: api/band/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Band>> GetBand(int id)
        {
            var band = await _context.Band.FindAsync(id);

            if (band == null)
            {
                return NotFound();
            }

            return band;
        }
        
        [HttpPost("{bandId}/artiest")]
        public async Task<ActionResult<Band>> AddArtiest(int bandId, [FromBody] Artiest artiest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Band band = await _context.Band.Include(b => b.BandLeden).FirstOrDefaultAsync(b => b.Id == bandId);
            if (band == null)
            {
                return NotFound();
            }
            artiest.BandId = band.Id;
            band.BandLeden.Add(artiest);
            await _context.SaveChangesAsync();
            return Ok(band);
        }

        // PUT: api/band/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBand(int id, Band band)
        {
            if (id != band.Id)
            {
                return BadRequest();
            }

            _context.Entry(band).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BandExists(id))
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

        // POST: api/band
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Band>> PostBand([FromBody] Band band)
        {
            _context.Band.Add(band);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBand", new { id = band.Id }, band);
        }

        // DELETE: api/band/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBand(int id)
        {
            var band = await _context.Band.FindAsync(id);
            if (band == null)
            {
                return NotFound();
            }

            _context.Band.Remove(band);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool BandExists(int id)
        {
            return _context.Band.Any(e => e.Id == id);
        }
    }
}
