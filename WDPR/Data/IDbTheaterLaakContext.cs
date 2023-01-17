using WDPR.Models;

namespace WDPR.Data
{
    public interface IDbTheaterLaakContext
    {
        IEnumerable<Reservering> GetReserveringen();
        void AddReservering(Reservering r);

        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
