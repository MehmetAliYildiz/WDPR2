using Microsoft.AspNetCore.Mvc;
using WDPR.Models;

namespace WDPR.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReserveringController : ControllerBase
    {
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
    }
}
