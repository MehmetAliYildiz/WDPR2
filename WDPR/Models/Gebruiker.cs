
using System.ComponentModel.DataAnnotations;

namespace WDPR.Models;

public class Gebruiker
{
    [Key]
    public int Id { get; set;}
    public string Naam { get; set; }
    public string Wachtwoord { get; set; }
    public string Email { get; set; }
}