using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using WDPR.Models;

public class DbTheaterLaakContext : IdentityDbContext
{
    public DbTheaterLaakContext(DbContextOptions<DbTheaterLaakContext> options)
        : base(options)
    {
    }

    public DbSet<Voorstelling> Voorstelling { get; set; }
    public DbSet<Reservering> Reserveringen { get; set; }
    public DbSet<Gebruiker> Gebruiker { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseSqlite("Data Source=DbTheaterLaakContext4.db");

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }


}