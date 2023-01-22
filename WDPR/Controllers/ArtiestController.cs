using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WDPR.Models;

namespace WDPR.Controllers{

[ApiController]
[Route("api/[controller]")]
public class ArtiestController : ControllerBase
{
    private readonly DbTheaterLaakContext _context;

        public ArtiestController(DbTheaterLaakContext context)
        {
            _context = context;
        }

    [HttpGet]
    public async Task<ActionResult<List<Artiest>>> GetArtiesten()
    {
        return await _context.Artiest.ToListAsync();
    }

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

    [HttpPost]
    public async Task<ActionResult<Artiest>> PostArtiest(Artiest artiest)
    {
        _context.Artiest.Add(artiest);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetArtiest", new { id = artiest.Id }, artiest);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Artiest>> DeleteArtiest(int id)
    {
        var artiest = await _context.Artiest.FindAsync(id);
        if (artiest == null)
        {
            return NotFound();
        }

        _context.Artiest.Remove(artiest);
        await _context.SaveChangesAsync();

        return artiest;
    }
    
}
}