namespace WDPR.Models
{
    public class StoelKaartje
    {
        public int StoelId { get; set; }
        public Stoel Stoel { get; set; }

        public int KaartjeId { get; set; }
        public Kaartje Kaartje { get; set; }
    }
}
