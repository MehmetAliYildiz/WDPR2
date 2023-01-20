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
    public class ArtiestController : ControllerBase
    {
        private readonly DbTheaterLaakContext _context;

        public ArtiestController(DbTheaterLaakContext context)
        {
            _context = context;
        }

        // GET: api/Artiest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artiest>>> GetArtiest()
        {
            return await _context.Artiest.ToListAsync();
        }

        // GET: api/Artiest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Artiest>> GetArtiest(int id)
        {
            var artiest = await _context.Artiest.FindAsync(id);

            if (artiest == null)
            {
                return NotFound();
            }

            return artiest;
        }

        // PUT: api/Artiest/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtiest(int id, Artiest artiest)
        {
            if (id != artiest.Id)
            {
                return BadRequest();
            }

            _context.Entry(artiest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtiestExists(id))
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

        // POST: api/Artiest
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Artiest>> PostArtiest(Artiest artiest)
        {
            _context.Artiest.Add(artiest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtiest", new { id = artiest.Id }, artiest);
        }

        // DELETE: api/Artiest/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtiest(int id)
        {
            var artiest = await _context.Artiest.FindAsync(id);
            if (artiest == null)
            {
                return NotFound();
            }

            _context.Artiest.Remove(artiest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArtiestExists(int id)
        {
            return _context.Artiest.Any(e => e.Id == id);
        }
    }
}
