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
        public IEnumerable<Reservering> GetAll([FromRoute] string datum)
        {
            var data = new List<Reservering> {
                new Reservering(0)
                {
                    StartTijd = DateTime.Now.AddHours(+2),
                    EindTijd = DateTime.Now,
                    Naam = "Rapsessie"
                },
                new Reservering(1)
                {
                    StartTijd = DateTime.Now.AddHours(24),
                    EindTijd = DateTime.Now.AddHours(26),
                    Naam = "Workshop"
                },
                new Reservering(2)
                {
                    StartTijd = DateTime.Now.AddDays(1).AddHours(2),
                    EindTijd = DateTime.Now.AddDays(1),
                    Naam = "Test"
                }
            };

            return data.Where(r => r.StartTijd.Date.ToString().Equals(DateTime.Parse(datum).ToString()));
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] Reservering nieuweReservering)
        {
            if (nieuweReservering.StartTijd >= nieuweReservering.EindTijd)
            {
                return BadRequest("Start time must be before end time");
            }

            var overlappingEvents = _context.Reserveringen
                .Where(r => (r.StartTijd > nieuweReservering.StartTijd && r.StartTijd < nieuweReservering.EindTijd) // [---[##]==]
                         || (r.EindTijd > nieuweReservering.StartTijd && r.EindTijd < nieuweReservering.EindTijd)   // [==[##]---]
                         || (r.StartTijd < nieuweReservering.StartTijd && r.EindTijd > nieuweReservering.EindTijd)) // [==[######]==]
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
