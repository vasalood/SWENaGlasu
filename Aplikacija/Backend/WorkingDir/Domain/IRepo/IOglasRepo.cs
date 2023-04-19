using Domain.Models;
using System.Linq.Expressions;
using Utility;
using Domain.IRepo.Utils;


namespace Domain.IRepo
{
    public interface IOglasRepo
    {
        public Oglas? VratiOglas(long oglasId,Expression<Func<Oglas,object>>? lambdaInclude);
        public Task<List<Oglas>> VratiOglase(long[] oglasIds, Expression<Func<Oglas, object>>? lambdaInclude);
        public Task<List<Oglas>> VratiMtihNOglasa(int N, int M, OglasFilteri? filteri, Order order );
        public Task<List<Slika>> PostaviSlike(List<IFormFile> slike);
        public Task<int> PrebrojiOglaseZaFiltere(OglasFilteri? filteri);
        public Task SacuvajOglas(Oglas oglas);
    }
}
