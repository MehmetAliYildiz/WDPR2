using System.Runtime;
using System.ComponentModel.DataAnnotations;


namespace WDPR.Models;

public class Voorstelling
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Zaal Zaal { get; set; }
    public string Img { get; set; }
    public Band? Band { get; set; }
}