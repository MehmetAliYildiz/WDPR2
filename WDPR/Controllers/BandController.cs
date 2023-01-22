using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WDPR.Models;

namespace WDPR.Controllers{

[ApiController]
[Route("api/[controller]")]
public class BandController : ControllerBase
{
    private readonly DbTheaterLaakContext _context;

        public BandController(DbTheaterLaakContext context)
        {
            _context = context;
        }

    [HttpGet]
    public async Task<ActionResult<List<Band>>> GetBands()
    {
        return await _context.Band.ToListAsync();
    }

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

    [HttpPost]
    public async Task<ActionResult<Band>> PostBand(Band band)
    {
        _context.Band.Add(band);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetBand", new { id = band.Id }, band);
    }

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

    [HttpPut("{bandId}/artist/{artiestId}")]
    public async Task<IActionResult> AddArtistToBand(int bandId, int artiestId)
    {
        var band = await _context.Band.FindAsync(bandId);
        if (band == null)
        {
            return NotFound();
        }

        var artiest = await _context.Artiest.FindAsync(artiestId);
        if (artiest == null)
        {
            return NotFound();
        }
        _context.ArtiestBand.Add(new ArtiestBand { BandId = bandId, ArtiestId = artiestId });
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Band>> DeleteBand(int id)
    {
        var band = await _context.Band.FindAsync(id);
        if (band == null)
        {
            return NotFound();
        }

        _context.Band.Remove(band);
        await _context.SaveChangesAsync();

        return band;
    }

    private bool BandExists(int id)
    {
        return _context.Band.Any(e => e.Id == id);
    }
}
}
