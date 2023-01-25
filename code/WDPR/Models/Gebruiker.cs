
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace WDPR.Models;

public class Gebruiker : IdentityUser
{
    public virtual ICollection<Review> Reviews { get; set; }
    
    public Gebruiker()
    {
        Reviews = new List<Review>();
    }
}