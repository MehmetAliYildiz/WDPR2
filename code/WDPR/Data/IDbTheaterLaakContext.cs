using WDPR.Controllers;
using WDPR.Models;

    public interface IDbTheaterLaakContext
    {
        IEnumerable<Review> GetReview();
        IEnumerable<Agenda> GetAgenda();
        IEnumerable<Gebruiker> GetGebruiker();
        IEnumerable<Reservering> GetReserveringen();
        IEnumerable<Zaal> GetZalen();
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
        Task<Agenda> FindAgenda(int id);
        Task<Review> FindReview(int id);
        Task<Band> FindBand(int id);
        Task<Bestelling> FindBestelling(int id);
        Task<Stoel> FindStoel(int id);
        Task<Gebruiker> FindGebruiker(string id);
        Kaartje FindKaartje(int id);
        Task<Artiest> FindArtiest(string id);
        Task<Gebruiker> FindGebruikerByEmail(string email);
        void AddReservering(Reservering r);
        void AddReview(Review r);
        void AddGebruiker(Gebruiker g);
        void AddAgenda(Agenda a);
        void AddBand(Band b);
        void AddArtiest(Artiest a);
        void AddKaartje(Kaartje k);
        void AddStoel(Stoel s);
        void AddStoelKaartje(StoelKaartje k);
        void AddArtiestBand(ArtiestBand ab);
        void AddZaal(Zaal z);
        void AddVrijeRuimte(VrijeRuimte v);
        void AddVoorstelling(Voorstelling v);
        void RemoveReview(int r);
        void RemoveBand(int id);
        void RemoveArtiest(string id);
        void RemoveAgenda(int id);
        void RemoveGebruiker(string id);
        void RemoveVoorstelling(int id);
        void RemoveVoorstellingRange(IEnumerable<Voorstelling> v);
        void RemoveAgendaRange(IEnumerable<Agenda> a);

        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
