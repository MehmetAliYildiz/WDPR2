using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WDPR.Models;

public class Review
{
    [Key]
    public int id{get; set;}
    public string recensie{get; set;}
    [ForeignKey("GebruikerId")]
    public string gebruikerId{get; set;}
    [ForeignKey("VoorstellingId")]
    public int voorstellingId{get; set;}
    public virtual Gebruiker Gebruiker {get; set;}
    public virtual Voorstelling Voorstelling {get; set;}
    
}