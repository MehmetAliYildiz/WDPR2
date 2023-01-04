using System.Security.Cryptography.X509Certificates;

namespace WDPR.Models
{
    public class Zaal
    {
        public int ZaalId { get; set; }
        public bool StaatReserveringenToe { get; set; }

        public IEnumerable<Reservering> Reserveringen { get; set; }
        public IEnumerable<Stoel> Stoelen { get; set; }

        public Zaal(int zaalId)
        {
            ZaalId = zaalId;
            StaatReserveringenToe = false;
        }
    }
}
