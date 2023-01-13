
using System.ComponentModel.DataAnnotations;

namespace WDPR.Models
{
    public class Zaal
    {
        [Key]
        public int Id { get; set; }
        public bool StaatReserveringenToe { get; set; }
        public IEnumerable<Stoel>? Stoelen { get; set; }

        public Zaal(int id)
        {
            Id = id;
            StaatReserveringenToe = false;
        }
        // public Zaal( Zaal oudeZaal){

        // }
    }
}
