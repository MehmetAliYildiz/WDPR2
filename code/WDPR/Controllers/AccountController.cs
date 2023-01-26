using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WDPR.Data;
using WDPR.Models;
using System.ComponentModel.DataAnnotations;

[Route("api/[controller]")]
[ApiController]

public class AccountController : ControllerBase
{
    private readonly UserManager<Gebruiker> _userManager;
    private readonly SignInManager<Gebruiker> _signInManager;
    private readonly DbTheaterLaakContext _context;

    public AccountController(UserManager<Gebruiker> userManager, DbTheaterLaakContext context, SignInManager<Gebruiker> SignInManager )
    {
        _userManager = userManager;
        _context = context;
        _signInManager = SignInManager;
    }

[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] GebruikerLogin gebruikerLogin)
{
    var _user = await _context.FindGebruikerByEmail(gebruikerLogin.Email);
    if (_user != null)
        if (await _userManager.CheckPasswordAsync(_user, gebruikerLogin.Password))
        {
            var secret = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.UTF8.GetBytes("awef98awef978haweof8g7aw789efhh789awef8h9awh89efh89awe98f89uawef9j8aw89hefawef"));

            var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim> { new Claim(ClaimTypes.Email, _user.Email) };
            var roles = await _userManager.GetRolesAsync(_user);
            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));
            var tokenOptions = new JwtSecurityToken
            (
                issuer: "http://localhost:5014",
                audience: "http://localhost:5014",
                claims: claims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: signingCredentials
            );
            return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions) });
        }

    return Unauthorized();
}

    [HttpPost]
    [Route("registreer")]
    public async Task<ActionResult<IEnumerable<Gebruiker>>> Registreer([FromBody] GebruikerMetWachwoord gebruikerMetWachwoord)
    {
        var resultaat = await _userManager.CreateAsync(gebruikerMetWachwoord, gebruikerMetWachwoord.Wachtwoord);
        if (!resultaat.Succeeded)
        {
            return new BadRequestObjectResult(resultaat);
        }
        else
        {
            await _userManager.AddToRoleAsync(gebruikerMetWachwoord, "bezoeker");
            return StatusCode(201);
        }
    }


[HttpPut]
[Route("wachtwoordWijzigen")]
public async Task<IActionResult> wachtwoordWijzigen([FromBody]wwVergetenDTO model)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    var user = await _userManager.FindByEmailAsync(model.Email);
    if (user == null)
    {
        return NotFound("email bestaat niet in ons systeem");
    }

    if (model.NewPassword != model.ConfirmPassword)
    {
        return BadRequest("Nieuw wachtwoord en bevestiging van het nieuwe wachtwoord komen niet overeen.");
    }

    var result = await _userManager.RemovePasswordAsync(user);
    if (!result.Succeeded)
    {
        return BadRequest(result.Errors);
    }
    
    result = await _userManager.AddPasswordAsync(user, model.NewPassword);
    if (!result.Succeeded)
    {
        return BadRequest(result.Errors);
    }

    return Ok();
}

}

public class GebruikerMetWachwoord : Gebruiker
{
    public string Wachtwoord { get; init; }
}

public class wwVergetenDTO{

    [Required]
    public string Email {get; set;}
    
    [Required]
    [DataType(DataType.Password)]
    public string NewPassword { get; set; }

    [DataType(DataType.Password)]
    [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
    public string ConfirmPassword { get; set; }
}