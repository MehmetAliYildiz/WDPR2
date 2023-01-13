using System.ComponentModel.DataAnnotations;

namespace WDPR.Models
{
    public class Reservering
    {
        [Key]
        public int Id { get; set; }
        public string Naam { get; set; }
        public DateTime StartTijd { get; set; }
        public DateTime EindTijd { get; set; }
        public Bestelling Bestelling { get; set; }
        public IEnumerable<Zaal> Zalen { get; set; }

        public Reservering(int id) {
            Id = id;
            Bestelling = new Bestelling();
            Zalen = new List<Zaal>();
            Naam = "";
        }
    }
}
