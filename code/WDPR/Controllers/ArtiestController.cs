using Azure.Storage.Blobs.Models;
using BCrypt.Net;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<Artiest> _userManager;

        public ArtiestController(IDbTheaterLaakContext context, UserManager<Artiest> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public ActionResult<List<Artiest>> GetArtiesten()
        {
            return _context.GetArtiesten().ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Artiest>> GetArtiest(string id)
        {
            var artiest = await _context.FindArtiest(id);

            if (artiest == null)
            {
                return NotFound();
            }

            return artiest;
        }

        [HttpPost]
        public async Task<CreatedAtActionResult> PostArtiest(ArtiestDTO artiestDTO)
        {
            var artiest = new Artiest()
            {
                UserName = artiestDTO.UserName,
                Email = artiestDTO.Email,
                ArtiestBands = new List<ArtiestBand>()
            };

            var result = _userManager.CreateAsync(artiest, artiestDTO.Wachtwoord);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtiest", result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Artiest>> DeleteArtiest(string id)
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

    public class ArtiestDTO : Gebruiker {
        public string Wachtwoord { get; set; }
    }
}