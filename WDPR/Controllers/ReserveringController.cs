using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WDPR.Models;

namespace WDPR.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReserveringController : ControllerBase
    {
        private readonly DbTheaterLaakContext _context;

        public ReserveringController(DbTheaterLaakContext laakContext)
        {
            _context = laakContext;
        }


        [HttpGet("{datum}")]
        public IActionResult GetAll([FromRoute] string datum)
        {
            DateTime date;
            if (!DateTime.TryParse(datum, out date))
            {
                return BadRequest("\"" + datum + "\" was not recognized as a valid date");
            }

            return Ok(_context.Reserveringen.Where(r => r.StartTijd.Date == DateTime.Parse(datum).Date));
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] Reservering nieuweReservering)
        {
            if (nieuweReservering.StartTijd >= nieuweReservering.EindTijd)
            {
                return BadRequest("Start time must be before end time");
            }

            var overlappingEvents = _context.Reserveringen
                .Where(r => (r.StartTijd > nieuweReservering.StartTijd && r.StartTijd < nieuweReservering.EindTijd)   // [---[##]==]
                         || (r.EindTijd > nieuweReservering.StartTijd && r.EindTijd < nieuweReservering.EindTijd)     // [==[##]---]
                         || (r.StartTijd <= nieuweReservering.StartTijd && r.EindTijd >= nieuweReservering.EindTijd)) // [==[######]==] of [[####]]
                .ToList();

            if (overlappingEvents.Any())
            {
                return BadRequest("Overlapping events found in the database");
            }

            _context.Reserveringen.Add(nieuweReservering);
            _context.SaveChanges();

            return Ok();
        }
    }
}
