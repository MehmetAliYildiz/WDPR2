using System.Transactions;

namespace WDPR.Models
{
    public class Kaartje
    {
        public int Id { get; set; }
        public string? Hash { get; set; }
        public bool HashUsed { get; set; }
        public Agenda Agenda { get; set; }
        public ICollection<StoelKaartje> StoelKaartjes { get; set; }
        public Bestelling Bestelling { get; set; }
    }
}
