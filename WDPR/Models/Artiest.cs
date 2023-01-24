namespace WDPR.Models
{
    public class Artiest : Gebruiker
    {
        public ICollection<ArtiestBand> ArtiestBands { get; set; }
    }
}