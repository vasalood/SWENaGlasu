using Domain.Models;

namespace Services.Abs
{
    public interface IOglasService
    {
        public Task<List<Oglas>> VratiMtihNOglasa(int N, int M, object filters);
        public Task PostaviSlike(List<IFormFile> slike,long oglasId);
        public Task PostaviOglas(Oglas oglas);
        public Task<int> PrebrojiOglaseZaFiltere(object filters);
        public Task AzurirajOglas(Oglas oglas);
    }
}