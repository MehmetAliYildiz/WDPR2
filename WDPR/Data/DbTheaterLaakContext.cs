using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using WDPR.Models;
using WDPR.Data;
using System.Reflection.Emit;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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
    public DbSet<Band> Band {get; set;}
    public DbSet<Artiest> Artiest {get; set;}
    public DbSet<Kaartje> Kaartjes { get; set; }
    public DbSet<StoelKaartje> StoelKaartjes { get; set; }

    public void AddReservering(Reservering r)
    {
        Reserveringen.Add(r);
    }

    public void AddKaartje(Kaartje k)
    {
        Kaartjes.Add(k);
    }

    public void AddStoelKaartje(StoelKaartje k)
    {
        StoelKaartjes.Add(k);
    }

    public IEnumerable<Reservering> GetReserveringen()
    {
        return Reserveringen.Include(r => r.Bestelling);
    }

    public IEnumerable<Zaal> GetZaal()
    {
        return Zaal.Include(z => z.Stoelen);
    }

    public IEnumerable<Kaartje> GetKaartjes()
    {
        return Kaartjes;
    }

    public IEnumerable<Stoel> GetStoelen()
    {
        return Stoel;
    }

    public IEnumerable<StoelKaartje> GetStoelKaartjes()
    {
        return StoelKaartjes.Include(sk => sk.Stoel).Include(sk => sk.Kaartje);
    }

    public async Task<Agenda> FindAgenda(int id)
    {
        return await Agenda.FindAsync(id);
    }

    public Kaartje FindKaartje(int id)
    {
        return Kaartjes.Include(k => k.Agenda).Where(k => k.Id == id).FirstOrDefault();
    }

    public async Task<Bestelling> FindBestelling(int id)
    {
        return await Bestellingen.FindAsync(id);
    }

    public async Task<Stoel> FindStoel(int id)
    {
        return await Stoel.FindAsync(id);
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

        builder.Entity<Agenda>()
            .HasMany(a => a.Kaartjes)
            .WithOne(k => k.Agenda);

        builder.Entity<Zaal>()
            .HasMany(z => z.Stoelen);
        builder.Entity<Reservering>()
            .HasOne(r => r.Bestelling);

        builder.Entity<StoelKaartje>()
            .HasOne(sk => sk.Stoel)
            .WithMany(s => s.StoelKaartjes)
            .HasForeignKey(sk => sk.StoelId);

        builder.Entity<StoelKaartje>().HasKey(sk => new { sk.StoelId, sk.KaartjeId });
        builder.Entity<StoelKaartje>()
            .HasOne(sk => sk.Kaartje)
            .WithMany(s => s.StoelKaartjes)
            .HasForeignKey(sc => sc.KaartjeId);
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