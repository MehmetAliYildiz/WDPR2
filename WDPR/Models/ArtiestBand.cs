using System.ComponentModel.DataAnnotations;

namespace WDPR.Models
{
    public class ArtiestBand
    {
        public int BandId { get; set; }
        public Band Band { get; set; }
        public int ArtiestId { get; set; }
        public Artiest Artiest { get; set; }
    }
}
