using Microsoft.AspNetCore.Mvc;
using WDPR.Models;

namespace WDPR.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ZaalController
    {
        [HttpGet]
        public IEnumerable<Zaal> GetAll()
        {
            var data = new List<Zaal> { new Zaal(0) { StaatReserveringenToe = true }, new Zaal(1) { StaatReserveringenToe = true }, new Zaal(2) { StaatReserveringenToe = true } };
            return data;
        }

        [HttpGet("{id}")]
        public IEnumerable<Zaal> GetSpecific([FromRoute] int id)
        {
            var data = new List<Zaal> { new Zaal(0) { StaatReserveringenToe = true }, new Zaal(1) { StaatReserveringenToe = true }, new Zaal(2) { StaatReserveringenToe = true } };
            return data.Where(z => z.ZaalId == id);
        }

        
    }
}
