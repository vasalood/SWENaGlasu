using Domain.Models;

namespace Services.Abs
{
    public interface IOglasService
    {
        public Task<List<Oglas>> VratiMtihNOglasa(int N, int M, object filters);
        public Task<List<Slika>> VratiNNaslovnihSlika(long[] oglasiIds);
        public Task PostaviOglas(OglasDto oglas);
        public Task<int> PrebrojiOglaseZaFiltere(object filters);
        public Task AzurirajOglas(Oglas oglas);
        public Task<List<Slika>> VratiSlike(long oglasId);
        public Oglas VratiOglas(long oglasId);
    }
}