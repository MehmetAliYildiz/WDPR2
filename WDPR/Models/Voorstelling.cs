using System.Runtime;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace WDPR.Models;
public class Voorstelling
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Img { get; set; }
    public string beschrijving {get; set;}
    public int? ZaalId { get; set; }
    public DateTime Datum { get; set; }
    public DateTime EindDatum { get; set; }

}
