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
    public DbSet<Bestelling> Bestellingen { get; set; }
    public DbSet<Gebruiker> Gebruiker { get; set; }
    public DbSet<Zaal> Zaal { get; set; }
    public DbSet<VrijeRuimte> VrijeRuimtes { get; set; }
    public DbSet<Stoel> Stoel {get; set; }
    public DbSet<Agenda> Agenda { get; set; }

    public void AddReservering(Reservering r)
    {
        Reserveringen.Add(r);
    }

    public IEnumerable<Reservering> GetReserveringen()
    {
        return Reserveringen.Include(r => r.Bestelling);
    }

    public IEnumerable<Zaal> GetZaal()
    {
        return Zaal.Include(z => z.Stoelen);
    }

    public IEnumerable<VrijeRuimte> GetVrijeRuimtes()
    {
        return VrijeRuimtes;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseSqlite("Data Source=DbTheaterLaakContext4.db");

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Zaal>()
            .HasMany(z => z.Stoelen);
        builder.Entity<Reservering>()
            .HasOne(r => r.Bestelling);
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