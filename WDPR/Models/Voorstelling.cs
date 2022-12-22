using System.Runtime;

namespace WDPR.Models;

public class Voorstelling
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Zaal Zaal { get; set; }
    public Band? Band { get; set; }
}