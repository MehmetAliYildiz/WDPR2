using Microsoft.AspNetCore.Mvc;
using WDPR.Models;
using Microsoft.EntityFrameworkCore;
using WDPR.Data;
using Microsoft.AspNetCore.SignalR;

namespace WDPR.Controllers{

    public class ZaalMetStoelnummers : Zaal
    {
        public List<List<int>> Rijen { get; set; }
        public ZaalMetStoelnummers(int id) : base(id) {}
    }

    [ApiController]
    [Route("[controller]")]

    public class ZaalController : ControllerBase
    {
 
        private readonly DbTheaterLaakContext _context;

        public ZaalController(DbTheaterLaakContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Zaal> GetZaal()
        {
            foreach(Stoel s in _context.Stoel)
            {
                Console.WriteLine(s.Id);
            }
            return _context.Zaal;
        }
        
        [HttpGet("zaal/{id}")]
        public IActionResult GetZaalById(int id)
        {
            var zaal = _context.GetZaal().Where(z => z.Id == id);
            if (zaal.Count() < 1)
            {
                return NotFound();
            }

            return Ok(zaal.First());
        }

        [HttpPost]
        public IActionResult PostZaal([FromBody] ZaalMetStoelnummers zms)
        {
            Zaal nieuweZaal = new Zaal(zms.Id);
            nieuweZaal.Stoelen = new List<Stoel>();
            _context.Zaal.Add(nieuweZaal);
            _context.SaveChangesAsync();

            int i = 0;
            foreach (List<int> rij in zms.Rijen)
            {
                foreach (int rang in rij)
                {
                    Stoel nieuweStoel = new Stoel()
                    {
                        Status = "Vrij",
                        Row = i,
                        Rang = rang
                    };
                    nieuweZaal.Stoelen.Add(nieuweStoel);
                }

                i++;
            }

            _context.SaveChangesAsync();

            return Ok();
        }
    }
}
