using System.ComponentModel.DataAnnotations;

namespace WDPR.Models
{
    public class VrijeRuimte
    {
        [Key]
        public int Id { get; set; }
        public string Img { get; set; }
    }
}
