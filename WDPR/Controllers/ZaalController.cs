using Microsoft.AspNetCore.Mvc;
using WDPR.Models;

namespace WDPR.Controllers{

    public class ZaalMetStoelnummers : Zaal
    {

        public int eersteRangs;
        public int tweedeRangs;
        public int derderangs;

        public ZaalMetStoelnummers(int id) : base(id)
        {
        }
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
            return _context.Zaal;
        }

        [HttpGet("{id}")]
        public IEnumerable<Zaal> GetSpecific([FromRoute] int id)
        {
            var data = new List<Zaal> { new Zaal(0) { StaatReserveringenToe = true }, new Zaal(1) { StaatReserveringenToe = true }, new Zaal(2) { StaatReserveringenToe = true } };
            return data.Where(z => z.Id == id);
        }

        [HttpPost]
        public IActionResult PostZaal([FromBody] ZaalMetStoelnummers zms)
        {
        Zaal nieuweZaal = new Zaal(zms.Id);
        List<Stoel> lijst = new List<Stoel>();

        for (int i = 0; i < zms.eersteRangs; i++)
        {

            Stoel nieuweStoel = new Stoel(){
                Status = "Vrij",
                Row = 0,
                Rang = 1
            };
            _context.Stoel.Add(nieuweStoel);
            _context.SaveChanges();
            lijst.Add(nieuweStoel);

        }
        nieuweZaal.Stoelen = lijst;

        _context.Zaal.Add(nieuweZaal);

        return Ok();
        }
    }
}
