using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WDPR.Models;

namespace WDPR.Controllers{

 [ApiController]
    [Route("[controller]")]
    public class StoelController : ControllerBase
    {
        private readonly DbTheaterLaakContext _context;

        public StoelController(DbTheaterLaakContext context)
        {
            _context = context;
        }

        [HttpPost]
         public async Task<ActionResult<Zaal>> PostStoel(Stoel stoel)
        {
            _context.Stoel.Add(stoel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStoel", new { id = stoel.Id }, stoel);
        }

         [HttpGet]
         public async Task<ActionResult<IEnumerable<Stoel>>> GetStoel()
         {
             return await _context.Stoel.ToListAsync();
         }
    }
}