namespace WDPR.Models
{
    public class Bestelling
    {
        public int Id { get; set; }
        public double Bedrag { get; set; }

        public bool Betaald { get; set; }

        public DateTime PlaatsTijd { get; set; }
    }
}
