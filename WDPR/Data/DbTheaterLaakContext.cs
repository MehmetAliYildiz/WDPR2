using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using WDPR.Models;
using WDPR.Data;

public class DbTheaterLaakContext : IdentityDbContext, IDbTheaterLaakContext
{
    public DbTheaterLaakContext(DbContextOptions<DbTheaterLaakContext> options)
        : base(options)
    {
    }

    public DbSet<Voorstelling> Voorstelling { get; set; }
    public DbSet<Reservering> Reserveringen { get; set; }
    public DbSet<Gebruiker> Gebruiker { get; set; }

    public void AddReservering(Reservering r)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<Reservering> GetReserveringen()
    {
        return Reserveringen;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseSqlite("Data Source=DbTheaterLaakContext4.db");

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }

    public override int SaveChanges()
    {
        return base.SaveChanges();
    }

    public Task<int> SaveChangesAsync()
    {
        return base.SaveChangesAsync();
    }
}