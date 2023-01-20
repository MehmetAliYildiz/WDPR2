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
    public DbSet<Artiest> Artiest { get; set; }
    public DbSet<Band> Band { get; set; }
    public DbSet<Reservering> Reserveringen { get; set; }
    public DbSet<Bestelling> Bestellingen { get; set; }
    public DbSet<Gebruiker> Gebruiker { get; set; }
    public DbSet<Zaal> Zaal {get; set;}

    public void AddReservering(Reservering r)
    {
        Reserveringen.Add(r);
    }

    public IEnumerable<Reservering> GetReserveringen()
    {
        return Reserveringen.Include(r => r.Bestelling);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseSqlite("Data Source=DbTheaterLaakContext23.db");

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Reservering>()
            .HasOne(r => r.Bestelling);
        // builder.Entity<Band>()
        //     .HasMany(b => b.BandLeden)
        //     .WithOne(b => b.Band)
        //     .HasForeignKey(a => a.Id);
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