namespace WDPR.Models
{
    public class Band : Gebruiker
    {
        public int Id { get; set; }
        public Gebruiker gebruiker { get; set; }
        public string omschrijving { get; set; }
        public string artiestAfbeelding { get; set; }
        public string website { get; set; }
    }
}
