using Domain.Models;
using Utility;
using Domain.IRepo.Utils;

namespace Services.Abs
{
    public interface IOglasService
    {
        public Task<List<Oglas>> VratiMtihNOglasa(int N, int M, OglasFilteri filteri, Order order);
        public Task<List<Slika>> VratiNaslovneSlike(long[] oglasiIds);
        public Task PostaviOglas(OglasDto oglas);
        public Task<int> PrebrojiOglaseZaFiltere(OglasFilteri filteri);
        public Task AzurirajOglas(Oglas oglas);
        public Task<List<Slika>> VratiSlike(long oglasId);
        public Oglas VratiOglas(long oglasId);
    }
}