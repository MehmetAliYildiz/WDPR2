using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WDPR.Models;

namespace WDPR.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VrijeRuimteController : ControllerBase
    {
        private readonly DbTheaterLaakContext _context;

        public VrijeRuimteController(DbTheaterLaakContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<VrijeRuimte> GetVrijeRuimtes()
        {
            return _context.GetVrijeRuimtes();
        }

        [HttpGet("{id}")]
        public IActionResult GetVrijeRuimteById(int id)
        {
            var vrijeRuimte = _context.GetVrijeRuimtes().Where(vr => vr.Id == id);
            if (vrijeRuimte.Count() < 1)
            {
                return NotFound();
            }

            return Ok(vrijeRuimte.First());
        }

        [HttpPost]
        public IActionResult PostVrijeRuimte([FromBody] VrijeRuimte nieuweRuimte)
        {
            _context.AddVrijeRuimte(nieuweRuimte);
            _context.SaveChangesAsync();
            Console.WriteLine(_context.GetVrijeRuimtes().Count());
            return Ok();
        }
    }
}
