using Domain.Models;

namespace Services.Abs
{
    public interface IKategorijaService
    {
        public Task DodajKategoriju(Kategorija kategorija);
        public Kategorija VratiKategoriju(int id);

        public Task<List<Kategorija>> VratiKategorije();

        public Task AzurirajKategoriju(Kategorija kategorija);

        public Dictionary<string, string>? VratiPoljaKategorije(int id);

        public Task ObrisiKategoriju(int id);
    }
}