using WDPR.Models;

namespace WDPR.Data
{
    public interface IDbTheaterLaakContext
    {
        IEnumerable<Reservering> GetReserveringen();
        IEnumerable<Zaal> GetZaal();
        IEnumerable<VrijeRuimte> GetVrijeRuimtes();
        void AddReservering(Reservering r);

        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
