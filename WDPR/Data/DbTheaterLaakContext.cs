using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using WDPR.Models;
using WDPR.Data;
using System.Reflection.Emit;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

public class DbTheaterLaakContext : IdentityDbContext, IDbTheaterLaakContext
{
    public DbTheaterLaakContext(DbContextOptions<DbTheaterLaakContext> options)
        : base(options) {}

    #region DbSets
    private DbSet<Voorstelling> Voorstelling { get; set; }
    private DbSet<Reservering> Reserveringen { get; set; }
    private DbSet<Bestelling> Bestellingen { get; set; }
    public DbSet<Gebruiker> Gebruiker { get; set; }
    private DbSet<Zaal> Zaal { get; set; }
    private DbSet<VrijeRuimte> VrijeRuimtes { get; set; }
    private DbSet<Stoel> Stoel {get; set; }
    public DbSet<Agenda> Agenda { get; set; }
    private DbSet<Band> Band {get; set;}
    private DbSet<Artiest> Artiest {get; set;}
    private DbSet<ArtiestBand> ArtiestBand {get; set;}
    private DbSet<Kaartje> Kaartjes { get; set; }
    private DbSet<StoelKaartje> StoelKaartjes { get; set; }
    #endregion

    #region AddObject
    public void AddReservering(Reservering r)
    {
        Reserveringen.Add(r);
    }

    public void AddVoorstelling(Voorstelling v)
    {
        Voorstelling.Add(v);
    }

    public void AddKaartje(Kaartje k)
    {
        Kaartjes.Add(k);
    }

    public void AddStoel(Stoel s)
    {
        Stoel.Add(s);
    }

    public void AddStoelKaartje(StoelKaartje k)
    {
        StoelKaartjes.Add(k);
    }

    public void AddZaal(Zaal z)
    {
        Zaal.Add(z);
    }

    public void AddBand(Band b)
    {
        Band.Add(b);
    }

    public void AddArtiest(Artiest a)
    {
        Artiest.Add(a);
    }

    public void AddArtiestBand(ArtiestBand ab)
    {
        ArtiestBand.Add(ab);
    }

    public void AddVrijeRuimte(VrijeRuimte v)
    {
        VrijeRuimtes.Add(v);
    }
    #endregion

    #region RemoveObject
    public void RemoveVoorstelling(int id)
    {
        Voorstelling.Where(v => v.Id == id).ForEachAsync(v => Voorstelling.Remove(v));
    }

    public void RemoveVoorstellingRange(IEnumerable<Voorstelling> v)
    {
        Voorstelling.RemoveRange(v);
    }

    public void RemoveBand(int id)
    {
        Band.Where(b => b.Id == id).ForEachAsync(b => Band.Remove(b));
    }

    public void RemoveArtiest(string id)
    {
        Artiest.Where(a => a.Id == id).ForEachAsync(a => Artiest.Remove(a));
    }
    #endregion

    #region GetLists
    public IEnumerable<Reservering> GetReserveringen()
    {
        return Reserveringen.Include(r => r.Bestelling);
    }

    public IEnumerable<Voorstelling> GetVoorstellingen()
    {
        return Voorstelling;
    }

    public IEnumerable<Zaal> GetZaal()
    {
        return Zaal.Include(z => z.Stoelen);
    }

    public IEnumerable<Agenda> GetAgendas()
    {
        return Agenda;
    }

    public IEnumerable<Kaartje> GetKaartjes()
    {
        return Kaartjes;
    }

    public IEnumerable<Bestelling> GetBestellingen()
    {
        return Bestellingen;
    }

    public IEnumerable<Stoel> GetStoelen()
    {
        return Stoel;
    }

    public IEnumerable<StoelKaartje> GetStoelKaartjes()
    {
        return StoelKaartjes.Include(sk => sk.Stoel).Include(sk => sk.Kaartje);
    }

    public IEnumerable<Band> GetBands()
    {
        return Band;
    }

    public IEnumerable<Artiest> GetArtiesten()
    {
        return Artiest;
    }

    public IEnumerable<VrijeRuimte> GetVrijeRuimtes()
    {
        return VrijeRuimtes;
    }
    #endregion

    #region FindObject
    public async Task<Voorstelling> FindVoorstelling(int id)
    {
        return await Voorstelling.FindAsync(id);
    }

    public async Task<Gebruiker> FindGebruikerByEmail(string email)
    {
        return await Gebruiker.Where(g => g.Email == email).FirstOrDefaultAsync();
    }

    public async Task<Band> FindBand(int id)
    {
        return await Band.FindAsync(id);
    }

    public async Task<Artiest> FindArtiest(string id)
    {
        return await Artiest.FindAsync(id);
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
    #endregion

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


        builder.Entity<ArtiestBand>()
            .HasOne(ab => ab.Artiest)
            .WithMany(a => a.ArtiestBands)
            .HasForeignKey(ab => ab.ArtiestId);

        builder.Entity<ArtiestBand>().HasKey(ab => new { ab.ArtiestId, ab.BandId });
        builder.Entity<ArtiestBand>()
            .HasOne(ab => ab.Band)
            .WithMany(b => b.ArtiestBands)
            .HasForeignKey(ab => ab.BandId);
    }

    public override int SaveChanges()
    {
        return base.SaveChanges();
    }

    public Task<int> SaveChangesAsync()
    {
        return base.SaveChangesAsync();
    }

    public DbSet<WDPR.Models.ImageModel> ImageModel { get; set; }
}