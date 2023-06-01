using Domain.Models;
using Services.Utility;
using Domain.IRepo.Utility;
using System.Linq.Expressions;
using Utility;

namespace Services.Abs
{
    public interface IOglasService
    {
        public Task<List<Oglas>> VratiMtihNOglasa(int N, int M, OglasFilteri? filteri,Order order);
        public Task<List<Slika>> VratiNaslovneSlike(long[] oglasiIds);
        public Task<ZipFile> VratiNaslovneSlikeZIP(long[] oglasIds);

        public byte[] VratiSliku(string path);
        public Task PostaviOglas(OglasForm form);
        public Task<int> PrebrojiOglaseZaFiltere(OglasFilteri? filteri);
        public void AzurirajOglas(Oglas oglas,OglasForm form);
        public Task<List<Slika>> VratiSlike(long oglasId);
        public Task<ZipFile> VratiSlikeZIP(long oglasId);
        public Oglas VratiOglas(long oglasId, params Expression<Func<Oglas,object>>[]? predicate);

        public void DodajFavorita(FavoritSpoj favorit);
        
        public void SkiniFavorita(int Id);

        public bool JelFavorit(long oglasId, string id);

        public Task<List<Oglas>> VratiFavorite(string userId,int M, int N,Order order);

        public int PrebrojiFavorite(string userId);
        public void InkrementOglasPregledi(long id);

        public void ObrisiOglas(long id);
    }
}