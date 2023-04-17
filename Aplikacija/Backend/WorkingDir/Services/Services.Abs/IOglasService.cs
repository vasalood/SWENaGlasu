using Domain.Models;

namespace Services.Abs
{
    public interface IOglasService
    {
        public Task<List<Oglas>> VratiMtihNOglasa(int N, int M, object filters);
        public Task PostaviOglas(OglasDto oglas);
        public Task<int> PrebrojiOglaseZaFiltere(object filters);
        public Task AzurirajOglas(Oglas oglas);
        public Task<Slika> VratiSliku(long oglasId, int slikaBr);
    }
}