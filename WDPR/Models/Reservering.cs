using System.ComponentModel.DataAnnotations;

namespace WDPR.Models
{
    public class Reservering
    {
        [Key]
        public int Id { get; set; }
        public int VrijeRuimteId { get; set; }
        public string Naam { get; set; }
        public DateTime StartTijd { get; set; }
        public DateTime EindTijd { get; set; }
        public Bestelling Bestelling { get; set; }
        //public Gebruiker Gebruiker { get; set; }

        public Reservering(int id) {
            Id = id;
            Naam = "";
        }
    }
}
