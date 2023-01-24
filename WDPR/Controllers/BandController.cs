using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WDPR.Data;
using WDPR.Models;

namespace WDPR.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class BandController : ControllerBase
    {
        private readonly IDbTheaterLaakContext _context;

        public BandController(IDbTheaterLaakContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Band>>> GetBands()
        {
            return _context.GetBands().ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Band>> GetBand(int id)
        {
            var band = await _context.FindBand(id);

            if (band == null)
            {
                return NotFound();
            }

            return band;
        }

        [HttpPost]
        public async Task<CreatedAtActionResult> PostBand(BandDTO bandDTO)
        {
            var band = new Band
            {
                Id = bandDTO.Id,
                Naam = bandDTO.Naam,
                ArtiestBands = new List<ArtiestBand>()
            };
            _context.AddBand(band);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBand", new { id = band.Id }, band);
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutBand(int id, Band band)
        //{
        //    if (id != band.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(band).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!BandExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        [HttpPut("{bandId}/artist/{artiestId}")]
        public async Task<IActionResult> AddArtistToBand(int bandId, int artiestId)
        {
            var band = await _context.FindBand(bandId);
            if (band == null)
            {
                return NotFound();
            }

            var artiest = await _context.FindBand(artiestId);
            if (artiest == null)
            {
                return NotFound();
            }
            _context.AddArtiestBand(new ArtiestBand { BandId = bandId, ArtiestId = artiestId });
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Band>> DeleteBand(int id)
        {
            var band = await _context.FindBand(id);
            if (band == null)
            {
                return NotFound();
            }

            _context.RemoveBand(id);
            await _context.SaveChangesAsync();

            return band;
        }

        private bool BandExists(int id)
        {
            return _context.GetBands().Any(e => e.Id == id);
        }
    }

    public class BandDTO
    {
        public int Id { get; set; }
        public string Naam { get; set; }
    }
}
