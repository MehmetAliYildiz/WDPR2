using System.ComponentModel.DataAnnotations;

public class GebruikerLogin
{
    [Required(ErrorMessage = "Gebruikersnaam mist!")]
    public string? UserName { get; init; }

    [Required(ErrorMessage = "wachtwoord is niet ingevoerd!")]
    public string? Password { get; init; }
    public string? Role {get;}
}