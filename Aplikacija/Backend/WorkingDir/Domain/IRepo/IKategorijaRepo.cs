using Domain.Models;
using Utility;

namespace Domain.IRepo
{
    public interface IKategorijaRepo
    {
        public Task DodajKategoriju(Kategorija kategorija);
        public Kategorija? VratiKategoriju(int id);
        public Task<List<Kategorija>?> VratiKategorije(OrderType orderType);
        public Task AzurirajKategoriju(Kategorija oldKategorija,Kategorija kategorija);
        public Task ObrisiKategoriju(Kategorija kategorija);
    }
}