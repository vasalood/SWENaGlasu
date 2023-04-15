using Domain.Models;
using Services.Abs;
using Domain.IRepo;
using Domain.Exceptions;

namespace Services.Impl
{
    public class OglasService : IOglasService
    {
        private readonly IOglasRepo _repo;
        public OglasService(IOglasRepo repo)
        {
            _repo = repo;
        }

        public async Task AzurirajOglas(Oglas oglas)
        {
            var oldOglas = _repo.VratiOglas(oglas.Id);
            if(oldOglas==null)
            {
                throw new NullOglasException(oglas.Id);
            }
            await _repo.AzurirajOglas(oldOglas, oglas);
        }

        public async Task PostaviOglas(Oglas oglas)
        {
            await _repo.PostaviOglas(oglas);
        }

        public async Task PostaviSlike(List<IFormFile> slike,long oglasId)
        {
            var tmpO = _repo.VratiOglas(oglasId);
            if(tmpO==null)
                throw new NullOglasException(oglasId);
            Oglas oglas = tmpO;
            List<Slika> listaSlika =await _repo.PostaviSlike(slike);
            oglas.Slike = listaSlika;
            AzurirajOglas(oglas);
        }

        public async Task<int> PrebrojiOglaseZaFiltere(object filters)
        {
            return await _repo.PrebrojiOglaseZaFiltere(filters);
        }

        public async Task<List<Oglas>> VratiMtihNOglasa(int N, int M, object filters)
        {
            var tmp = await _repo.VratiMtihNOglasa(N, M, filters);
            if(tmp==null)
                tmp = new List<Oglas>();
            return tmp;
        }
    }
}