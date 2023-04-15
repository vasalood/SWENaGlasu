using Domain.Models;
using Utility;

namespace Domain.IRepo
{
    public interface IOglasRepo
    {
        public Oglas? VratiOglas(long oglasId);
        public Task<List<Oglas>?> VratiMtihNOglasa(int N, int M, object filters);
        public Task<List<Slika>> PostaviSlike(List<IFormFile> slike);
        public Task<int> PrebrojiOglaseZaFiltere(object filters);
        public Task PostaviOglas(Oglas oglas);
        public Task AzurirajOglas(Oglas oldOglas,Oglas oglas);

    }
}