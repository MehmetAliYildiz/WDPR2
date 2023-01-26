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
    public class GebruikerController : ControllerBase
    {
        private readonly IDbTheaterLaakContext _context;

        public GebruikerController(DbTheaterLaakContext context)
        {
            _context = context;
        }

        // GET: api/Gebruiker
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gebruiker>>> GetGebruiker()
        {
            return _context.GetGebruiker().ToList();
        }

        // GET: api/Gebruiker/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<Gebruiker>> GetGebruiker(string id)
        {
            var gebruiker = await _context.FindGebruiker(id);

            if (gebruiker == null)
            {
                return NotFound();
            }

            return gebruiker;
        }

        // POST: api/Gebruiker
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Gebruiker>> PostGebruiker(Gebruiker gebruiker)
        {
            _context.AddGebruiker(gebruiker);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGebruiker", new { id = gebruiker.Id }, gebruiker);
        }

        // DELETE: api/Gebruiker/5
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteGebruiker(string id)
        {
            var gebruiker = await _context.FindGebruiker(id);
            if (gebruiker == null)
            {
                return NotFound();
            }

            _context.RemoveGebruiker(gebruiker.Id);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GebruikerExists(string id)
        {
            return _context.GetGebruiker().Any(e => e.Id == id);
        }
    }
}
