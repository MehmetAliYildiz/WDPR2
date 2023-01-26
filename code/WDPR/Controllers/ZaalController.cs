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
            return _context.GetZalen();
        }
        
        [HttpGet("zaal/{Id}")]
        public IActionResult GetZaalById(int id)
        {
            var zaal = _context.GetZalen().Where(z => z.Id == id);
            if (zaal.Count() < 1)
            {
                return NotFound();
            }

            return Ok(zaal.First());
        }

        [HttpPost]
        public async Task<IActionResult> PostZaal([FromBody] ZaalMetStoelnummers zms)
        {
            Zaal nieuweZaal = new Zaal(zms.Id);
            nieuweZaal.Stoelen = new List<Stoel>();
            _context.AddZaal(nieuweZaal);
            await _context.SaveChangesAsync();

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

            await _context.SaveChangesAsync();

            return Ok(nieuweZaal.Stoelen.Count() + " " + _context.GetZalen().Where(z => z.Id == nieuweZaal.Id).FirstOrDefault().Stoelen.Count());
        }
    }
}
