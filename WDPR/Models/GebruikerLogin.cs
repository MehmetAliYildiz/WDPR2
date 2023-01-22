using System.ComponentModel.DataAnnotations;

public class GebruikerLogin
{
    [Required(ErrorMessage = "email mist!")]
    public string? Email { get; init; }

    [Required(ErrorMessage = "wachtwoord is niet ingevoerd!")]
    public string? Password { get; init; }
    public string? Role {get;}
}