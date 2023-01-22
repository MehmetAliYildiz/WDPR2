namespace WDPR.Models
{
    public class Bestelling
    {
        public int Id { get; set; }
        
        public double Bedrag { get; set; }

        public string? IP { get; set; }
        public Gebruiker? Gebruiker { get; set; }

        public bool Betaald { get; set; }

        public string? BetaalCode { get; set; }

        public DateTime PlaatsTijd { get; set; }
    }
}
