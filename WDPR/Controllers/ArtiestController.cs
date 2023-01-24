using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WDPR.Data;
using WDPR.Models;

namespace WDPR.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class ArtiestController : ControllerBase
    {
        private readonly IDbTheaterLaakContext _context;

        public ArtiestController(IDbTheaterLaakContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Artiest>> GetArtiesten()
        {
            return _context.GetArtiesten().ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Artiest>> GetArtiest(int id)
        {
            var artiest = await _context.FindArtiest(id);

            if (artiest == null)
            {
                return NotFound();
            }

            return artiest;
        }

        [HttpPost]
        public async Task<ActionResult<Artiest>> PostArtiest(ArtiestDTO artiestDTO)
        {
            var artiest = new Artiest()
            {
                Id = artiestDTO.Id,
                Naam = artiestDTO.Naam,
                Wachtwoord = artiestDTO.Wachtwoord,
                Email = artiestDTO.Email,
                ArtiestBands = new List<ArtiestBand>()
            };

            _context.AddArtiest(artiest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtiest", new { id = artiest.Id }, artiest);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Artiest>> DeleteArtiest(int id)
        {
            var artiest = await _context.FindArtiest(id);
            if (artiest == null)
            {
                return NotFound();
            }

            _context.RemoveArtiest(id);
            await _context.SaveChangesAsync();

            return artiest;
        }
    }

    public class ArtiestDTO : Gebruiker { }
}