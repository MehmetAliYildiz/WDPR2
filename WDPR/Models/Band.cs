namespace WDPR.Models
{
    public class Band
    {
        public int Id { get; set; }
        public string Naam { get; set; }

        public ICollection<ArtiestBand> ArtiestBands { get; set; }
    }
}
