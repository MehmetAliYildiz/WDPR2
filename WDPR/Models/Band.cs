using System.ComponentModel.DataAnnotations;

namespace WDPR.Models;

public class Band
{
    [Key]
    public int Id { get; set; }
    [Required(ErrorMessage = "The Name field is required.")]
    public string Naam { get; set; }
    public List<Artiest> BandLeden { get; set; } = null;
    public Band()
    {
        if (BandLeden == null)
            BandLeden = new List<Artiest>();
    }
}