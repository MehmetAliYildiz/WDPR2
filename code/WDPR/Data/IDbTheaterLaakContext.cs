using WDPR.Controllers;
using WDPR.Models;

namespace WDPR.Data
{
    public interface IDbTheaterLaakContext
    {
        IEnumerable<Review> GetReview();
        IEnumerable<Reservering> GetReserveringen();
        IEnumerable<Zaal> GetZaal();
        IEnumerable<Kaartje> GetKaartjes();
        IEnumerable<Stoel> GetStoelen();
        IEnumerable<StoelKaartje> GetStoelKaartjes();
        IEnumerable<VrijeRuimte> GetVrijeRuimtes();
        IEnumerable<Bestelling> GetBestellingen();
        IEnumerable<Band> GetBands();
        IEnumerable<Agenda> GetAgendas();
        IEnumerable<Artiest> GetArtiesten();
        IEnumerable<Voorstelling> GetVoorstellingen();
        Task<Voorstelling> FindVoorstelling(int id);
        Task<Review> FindReview(int id);
        Task<Band> FindBand(int id);
        Task<Agenda> FindAgenda(int id);
        Task<Bestelling> FindBestelling(int id);
        Task<Stoel> FindStoel(int id);
        Kaartje FindKaartje(int id);
        Task<Artiest> FindArtiest(string id);
        Task<Gebruiker> FindGebruikerByEmail(string email);
        void AddReservering(Reservering r);
        void AddReview(Review r);
        void AddBand(Band b);
        void AddArtiest(Artiest a);
        void AddKaartje(Kaartje k);
        void AddStoel(Stoel s);
        void AddStoelKaartje(StoelKaartje k);
        void AddArtiestBand(ArtiestBand ab);
        void AddZaal(Zaal z);
        void AddVrijeRuimte(VrijeRuimte v);
        void AddVoorstelling(Voorstelling v);
        void RemoveReview(string r);
        void RemoveBand(int id);
        void RemoveArtiest(string id);
        void RemoveVoorstelling(int id);
        void RemoveVoorstellingRange(IEnumerable<Voorstelling> v);

        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
