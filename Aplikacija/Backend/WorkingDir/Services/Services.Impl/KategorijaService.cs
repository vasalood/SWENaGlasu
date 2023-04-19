using Domain.Models;
using Services.Abs;
using Domain.IRepo;
using Domain.Exceptions;
using Utility;

namespace Services.Impl
{
    public class KategorijaService : IKategorijaService
    {
        private readonly IKategorijaRepo _repo;
        public KategorijaService(IKategorijaRepo repo)
        {
            _repo = repo;
        }
        public async Task AzurirajKategoriju(Kategorija kategorija)
        {
            var mKategorija = VratiKategoriju(kategorija.Id);
            if(mKategorija==null)
                throw new NullKategorijaException(kategorija.Id);
            await _repo.AzurirajKategoriju(mKategorija,kategorija);
        }

        public async Task DodajKategoriju(Kategorija kategorija)
        {
            await _repo.DodajKategoriju(kategorija);
        }

        public Task ObrisiKategoriju(int id)
        {
            var kategorija = _repo.VratiKategoriju(id);
            if(kategorija==null)
                throw new NullKategorijaException(id);
            return _repo.ObrisiKategoriju(kategorija);
        }

        public async Task<List<Kategorija>> VratiKategorije()
        {
            var ret =await _repo.VratiKategorije(OrderType.Ascending);
            if(ret==null)
            {
                ret = new List<Kategorija>();
            }    
            return ret;
        }

        public Kategorija VratiKategoriju(int id) 
        {
            Kategorija? ret = _repo.VratiKategoriju(id);
            if(ret==null)
                throw new NullKategorijaException(id);
            return ret;
        }

        public Dictionary<string, string>? VratiPoljaKategorije(int id)
        {
            Kategorija? kat= _repo.VratiKategoriju(id);
            if(kat==null)
                throw new NullKategorijaException(id);
            return kat.Polja;
        }
    }
}