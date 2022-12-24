using System.ComponentModel.DataAnnotations;

namespace WDPR.Models;

public class Voorstelling
{
    [Key]
    public int id { get; set; }
    public string img { get; set; }
    public string naam { get; set; }
    public string beschrijving { get; set; }
}