using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

public class GebruikerMetWachwoord : IdentityUser
{
    public string? Password { get; init; }
}