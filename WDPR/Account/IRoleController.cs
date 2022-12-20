using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ReactApp.Account
{
    // KIJK UIT: classes die een controller extenden moeten ook ControllerBase extenden
    public interface IRoleController
    {
        public Task<object> RegistreerRol([FromBody] string rolNaam); // Moet async zijn
        public IEnumerable<IdentityRole> GetRol([FromBody] string rolNaam);
    }
}
