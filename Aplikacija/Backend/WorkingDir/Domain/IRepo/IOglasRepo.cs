using Domain.Models;
using System.Linq.Expressions;
using Utility;

namespace Domain.IRepo
{
    public interface IOglasRepo
    {
        public Oglas? VratiOglas(long oglasId,Expression<Func<Oglas,object>>? lambdaInclude);
        public Task<List<Oglas>?> VratiMtihNOglasa(int N, int M, object filters);
        public Task<List<Slika>> PostaviSlike(List<IFormFile> slike);
        public Task<int> PrebrojiOglaseZaFiltere(object filters);
        public Task SacuvajOglas(Oglas oglas);
    }
}
