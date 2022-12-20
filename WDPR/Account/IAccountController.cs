using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ReactApp.Account
{
    public class GebruikerLogin
    {
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        private string _password;
        [Required(ErrorMessage = "Password is required")]
        public string Password {
            get
            {
                return _password;
            }
            set
            {
                PasswordSalt = BCrypt.Net.BCrypt.GenerateSalt();
                _password = BCrypt.Net.BCrypt.HashPassword(value, PasswordSalt);
            }
        }

        public string PasswordSalt { get; private set; }
    }

    // KIJK UIT: classes die een controller extenden moeten ook ControllerBase extenden
    public interface IAccountController
    {
        public Task<object> Registreer(AGebruiker gebruiker, IdentityRole rol); // Moet async zijn
        public Task<IActionResult> Login([FromBody] GebruikerLogin login);
        public Task<IActionResult> Logout([FromBody] AGebruiker gebruiker);
    }
}
