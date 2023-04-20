using Domain.Models;
using Services.Utility;
using Domain.IRepo.Utility;
using System.Linq.Expressions;

namespace Services.Abs
{
    public interface IOglasService
    {
        public Task<List<Oglas>> VratiMtihNOglasa(int N, int M, OglasFilteri? filteri);
        public Task<List<Slika>> VratiNaslovneSlike(long[] oglasiIds);
        public Task<ZipFile> VratiNaslovneSlikeZIP(long[] oglasIds);
        public Task PostaviOglas(OglasDto oglas);
        public Task<int> PrebrojiOglaseZaFiltere(OglasFilteri? filteri);
        public Task AzurirajOglas(Oglas oglas,OglasDto nOglas);
        public Task<List<Slika>> VratiSlike(long oglasId);
        public Task<ZipFile> VratiSlikeZIP(long oglasId);
        public Oglas VratiOglas(long oglasId,Expression<Func<Oglas,object>>? predicate=null);
        public Task OceniOglas(long oglasId, OcenaDto ocena);
    }
}