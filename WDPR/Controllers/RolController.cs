using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

[Route("api/[controller]")]
[ApiController]
    public class Rol : ControllerBase
    {
    private readonly RoleManager<IdentityRole> _roleManager;

    public Rol(RoleManager<IdentityRole> roleManager)
    {
        _roleManager = roleManager;
    }
[HttpPost("CreateRol")]
    public async Task<IdentityResult> CreateRole(string role)
    {
        var bestaat = await _roleManager.RoleExistsAsync(role);
        if (!bestaat)
            {
                return await _roleManager.CreateAsync(new IdentityRole(role));
            }
            new BadRequestObjectResult(bestaat);
        return IdentityResult.Failed(new IdentityError { Description = $"Role {role} already exists." });
    }
[HttpDelete("DeleteRol")]
    public async Task<IdentityResult> DeleteRole(string role)
    {
        var roleToDelete = await _roleManager.FindByNameAsync(role);
        return await _roleManager.DeleteAsync(roleToDelete);
    }

    // public async Task<IdentityResult> AddUserToRole(string userId, string role)
    // {
    //     return await _roleManager.AddToRoleAsync(userId, role);
    // }
    }
