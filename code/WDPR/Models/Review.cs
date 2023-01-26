using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WDPR.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public string Recensie { get; set; }
        public int Sterren { get; set; }
        [ForeignKey("GebruikerId")]
        public string GebruikerId { get; set; }
        [ForeignKey("VoorstellingId")]
        public int VoorstellingId { get; set; }
        public virtual Gebruiker Gebruiker { get; set; }
        public virtual Voorstelling Voorstelling { get; set; }
    }
}
