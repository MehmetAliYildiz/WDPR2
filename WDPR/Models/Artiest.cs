namespace WDPR.Models
{
    using System.ComponentModel.DataAnnotations;
    public class Artiest
    {
        [Key]
        public int Id { get; set; }
        public string naam { get; set; }
        public string omschrijving { get; set; }
        public string artiestAfbeelding { get; set; }
        public string website { get; set; }
        public int? BandId { get; set; }
        public Band Band { get; set; } = null;
    }
}
