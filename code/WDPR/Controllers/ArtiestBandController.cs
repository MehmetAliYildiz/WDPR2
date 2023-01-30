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
    public class ArtiestBandController : ControllerBase
    {
        private readonly DbTheaterLaakContext _context;

        public ArtiestBandController(DbTheaterLaakContext context)
        {
            _context = context;
        }

        // GET: api/ArtiestBand
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArtiestBand>>> GetArtiestBand()
        {
            return await _context.ArtiestBand.ToListAsync();
        }

        // // GET: api/ArtiestBand/5
        // [HttpGet("{id}")]
        // public async Task<ActionResult<ArtiestBand>> GetArtiestBand(string id)
        // {
        //     var artiestBand = await _context.ArtiestBand.FindAsync(id);

        //     if (artiestBand == null)
        //     {
        //         return NotFound();
        //     }

        //     return artiestBand;
        // }

        // // PUT: api/ArtiestBand/5
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutArtiestBand(string id, ArtiestBand artiestBand)
        // {
        //     if (id != artiestBand.ArtiestId)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(artiestBand).State = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!ArtiestBandExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }

        // // POST: api/ArtiestBand
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPost]
        // public async Task<ActionResult<ArtiestBand>> PostArtiestBand(ArtiestBand artiestBand)
        // {
        //     _context.ArtiestBand.Add(artiestBand);
        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateException)
        //     {
        //         if (ArtiestBandExists(artiestBand.ArtiestId))
        //         {
        //             return Conflict();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return CreatedAtAction("GetArtiestBand", new { id = artiestBand.ArtiestId }, artiestBand);
        // }

        // // DELETE: api/ArtiestBand/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteArtiestBand(string id)
        // {
        //     var artiestBand = await _context.ArtiestBand.FindAsync(id);
        //     if (artiestBand == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.ArtiestBand.Remove(artiestBand);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }

        // private bool ArtiestBandExists(string id)
        // {
        //     return _context.ArtiestBand.Any(e => e.ArtiestId == id);
        // }
    }
}