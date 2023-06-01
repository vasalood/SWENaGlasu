using Domain.Models;
using System.Linq.Expressions;
using Domain.IRepo.Utility;
using Utility;

namespace Domain.IRepo
{
    public interface IOglasRepo
    {
        public Oglas? VratiOglas(long oglasId, params Expression<Func<Oglas, object>>[]? lambdas);
        public Task<List<Oglas>> VratiOglase(long[] oglasIds, params Expression<Func<Oglas, object>>[]? lambdas);
        public Task<List<Oglas>> VratiMtihNOglasa(int N, int M, OglasFilteri? filteri,Order order);
        public Task<List<Slika>> PostaviSlike(List<IFormFile> slike);
        public Task<int> PrebrojiOglaseZaFiltere(OglasFilteri? filteri);
        public Task SacuvajOglas(Oglas oglas);
        public void AzurirajOglas(Oglas oglas);
        public void ObrisiOglas(Oglas oglas);

        public void DodajFavorita(FavoritSpoj favorit);

        public void SkiniFavorita(int Id);

        public bool JelFavorit(long oglasId, string id);

        public Task<List<Oglas>> VratiFavorite(string userId,int M, int N,Order order);

        public int PrebrojiFavorite(string userId);

        public byte[] VratiSliku(string naziv);
    }
}
