using Microsoft.AspNetCore.Mvc;
using WDPR.Data;
using WDPR.Models;

namespace WDPR.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReserveringController : ControllerBase
    {
        private readonly IDbTheaterLaakContext _context;

        public ReserveringController(IDbTheaterLaakContext laakContext)
        {
            _context = laakContext;
        }


        [HttpGet("{id}/{datum}")]
        public IActionResult GetAll([FromRoute] int id, [FromRoute] string datum)
        {
            DateTime date;
            if (!DateTime.TryParse(datum, out date))
            {
                return BadRequest("\"" + datum + "\" was not recognized as a valid date");
            }

            return Ok(_context.GetReserveringen().Where(r => r.StartTijd.Date == DateTime.Parse(datum).Date && r.VrijeRuimteId == id));
        }

        [HttpPost("post")]
        public IActionResult Post([FromBody] Reservering nieuweReservering)
        {
            if (nieuweReservering.StartTijd >= nieuweReservering.EindTijd)
            {
                return BadRequest("Starttijd moet voor eindtijd zijn");
            }

            nieuweReservering.StartTijd = nieuweReservering.StartTijd.AddHours(1);
            nieuweReservering.EindTijd = nieuweReservering.EindTijd.AddHours(1);
            nieuweReservering.Bestelling = new Bestelling()
            {
                Betaald = false,
                PlaatsTijd = DateTime.Now,
                Bedrag = (nieuweReservering.EindTijd.Hour * 60 + nieuweReservering.EindTijd.Minute - (nieuweReservering.StartTijd.Hour * 60 + nieuweReservering.StartTijd.Minute)) * 0.25D,
                Type = "Reservering"
            };

            var overlappingEvents = _context.GetReserveringen()
                .Where(r => r.VrijeRuimteId == nieuweReservering.VrijeRuimteId && 
                           ((r.StartTijd > nieuweReservering.StartTijd && r.StartTijd < nieuweReservering.EindTijd)   // [---[##]==]
                            || (r.EindTijd > nieuweReservering.StartTijd && r.EindTijd < nieuweReservering.EindTijd)     // [==[##]---]
                            || (r.StartTijd <= nieuweReservering.StartTijd && r.EindTijd >= nieuweReservering.EindTijd))) // [==[######]==] of [######]
                .ToList();

            if (overlappingEvents.Any())
            {
                return BadRequest("Overlappende reserveringen gevonden in database");
            }

            _context.AddReservering(nieuweReservering);
            _context.SaveChanges();

            return Ok();
        }
    }
}
