using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WDPR.Models;

namespace WDPR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IDbTheaterLaakContext _context;
        private readonly UserManager<Gebruiker> _userManager;

        public AdminController(IDbTheaterLaakContext context, UserManager<Gebruiker> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Admin
        [HttpGet]
        public ActionResult<List<Admin>> GetAdmins()
        {
            return _context.GetAdmin().ToList();
        }

        // GET: api/Admin/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> GetAdmin1(string id)
        {
            var admin = await _context.FindAdmin(id);

            if (admin == null)
            {
                return NotFound();
            }

            return admin;
        }

        // // PUT: api/Admin/5
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutAdmin(string id, Admin admin)
        // {
        //     if (id != admin.Id)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(admin).State = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!AdminExists(id))
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

        // POST: api/Admin
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Admin>>> PostArtiest(AdminDTO adminDTO)
        {
            var admin = new Admin()
            {
                UserName = adminDTO.gebruikersnaam,
                PasswordHash = adminDTO.Wachtwoord,
                Email = adminDTO.Email
            };

            // await _userManager.AddToRoleAsync(admin, "Admin");
            _context.AddAdmin(admin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdmin", new { id = admin.Id }, admin);
            
        }

        //
        // // POST: api/Admin
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPost]
        // [Route("registreer")]
        // public async Task<ActionResult<IEnumerable<Admin>>> Registreer([FromBody] GebruikerMetWachwoordAdmin gebruikerMetWachwoord)
        // {
        //     var resultaat = await _userManager.CreateAsync(gebruikerMetWachwoord, gebruikerMetWachwoord.Wachtwoord);
        //     if (!resultaat.Succeeded)
        //     {
        //         return new BadRequestObjectResult(resultaat);
        //     }
        //     else
        //     {
        //         await _userManager.AddToRoleAsync(gebruikerMetWachwoord, "Admin");
        //         return StatusCode(201);
        //     }
        // }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Admin>> DeleteAdmin(string id)
        {
            var admin = await _context.FindAdmin(id);
            if (admin == null)
            {
                return NotFound();
            }

            _context.RemoveAdmin(id);
            await _context.SaveChangesAsync();

            return admin;
        }

        public class AdminDTO {
        public string gebruikersnaam {get; set;}
        public string Wachtwoord { get; set; }
        public string Email {get; set;}
    }
    }
}