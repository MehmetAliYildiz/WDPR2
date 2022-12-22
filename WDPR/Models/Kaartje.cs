namespace WDPR.Models
{
    public class Kaartje
    {
        public int Id { get; set; }
        //public Gebruiker Gebruiker { get; set; }
        public Stoel Stoel { get; set; }
        public Bestelling Bestelling { get; set; }
    }
}
