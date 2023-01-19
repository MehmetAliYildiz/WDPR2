namespace WDPR.Models
{
    public class Agenda
    {
        public int Id { get; set; }
        public int VoorstellingId { get; set; }
        public int ZaalId { get; set; }
        public DateTime StartDatumTijd { get; set; }
        public DateTime EindDatumTijd {get; set;}
    }
}