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
        private readonly UserManager<Gebruiker> _userManager;

        public ArtiestController(IDbTheaterLaakContext context, UserManager<Gebruiker> userManager)
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
                UserName = artiestDTO.gebruikersnaam,
                Email = artiestDTO.Email,
                ArtiestBands = new List<ArtiestBand>()
            };

            var result = await _userManager.CreateAsync(artiest, artiestDTO.Wachtwoord);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(artiest, "Artiest");
            }
            
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtiest", new { id = artiest.Id }, artiest);
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

    public class ArtiestDTO {
        public string gebruikersnaam {get; set;}
        public string Wachtwoord { get; set; }
        public string Email {get; set;}
    }
}