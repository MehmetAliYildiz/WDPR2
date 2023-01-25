using System.Runtime;
using System.ComponentModel.DataAnnotations;

namespace WDPR.Models;
public class Voorstelling
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string beschrijving{ get; set; }
    public string Img { get; set; }
    public virtual ICollection<Review> Reviews { get; set; }
    
    public Voorstelling()
    {
        Reviews = new List<Review>();
    }
}
