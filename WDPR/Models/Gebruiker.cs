using System.ComponentModel.DataAnnotations;

namespace WDPR.Models;

public class Gebruiker
{
    [Key]
    public int id { get; set; }
    public string naam { get; set; }
    public string email { get; set; }
    public string wachtwoord { get; set; }
}