using WDPR.Models;

namespace WDPR.Data
{
    public interface IDbTheaterLaakContext
    {
        IEnumerable<Reservering> GetReserveringen();
        IEnumerable<Zaal> GetZaal();
        IEnumerable<Kaartje> GetKaartjes();
        IEnumerable<Stoel> GetStoelen();
        IEnumerable<StoelKaartje> GetStoelKaartjes();
        Task<Agenda> FindAgenda(int id);
        Task<Bestelling> FindBestelling(int id);
        Task<Stoel> FindStoel(int id);
        Kaartje FindKaartje(int id);
        void AddReservering(Reservering r);
        void AddKaartje(Kaartje k);
        void AddStoelKaartje(StoelKaartje k);

        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
