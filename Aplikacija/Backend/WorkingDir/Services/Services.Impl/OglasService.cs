using Domain.Models;
using Services.Abs;
using Domain.IRepo;
using Domain.Exceptions;
using Models;

namespace Services.Impl
{
    public class OglasService : IOglasService
    {
        private readonly IOglasRepo _repo;
        private readonly IKorisnikService _korisnikService;
        private readonly IKategorijaService _kategorijaService;
        public OglasService(IOglasRepo repo,IKorisnikService korisnikService,IKategorijaService kategorijaService)
        {
            _repo = repo;
            _korisnikService = korisnikService;
            _kategorijaService = kategorijaService;
        }

        public async Task AzurirajOglas(Oglas oglas)
        {
            var oldOglas = _repo.VratiOglas(oglas.Id,null);
            if(oldOglas==null)
            {
                throw new NullOglasException(oglas.Id);
            }
            await _repo.AzurirajOglas(oldOglas, oglas);
        }

        public async Task PostaviOglas(Oglas oglas)
        {
            oglas.Vlasnik= _korisnikService.VratiKorisnika(oglas.Vlasnik.Id);
            var kategorija = _kategorijaService.VratiKategoriju(oglas.Podkategorija.KategorijaId);
            if(kategorija==null)
                throw new NullKategorijaException(oglas.Podkategorija.KategorijaId);
            var podkategorija = kategorija.Podkategorije.Find(p => p.Id == oglas.Podkategorija.Id);
            if(podkategorija==null)
                throw new NullPodkategorijaException(oglas.Podkategorija.Id);
            //podkategorija.KategorijaNaziv = kategorija.Ime;
            oglas.Podkategorija =podkategorija;
            await _repo.PostaviOglas(oglas);
        }

        public async Task PostaviSlike(List<IFormFile> slike,long oglasId)
        {
            var tmpO = _repo.VratiOglas(oglasId,null);
            if(tmpO==null)
                throw new NullOglasException(oglasId);
            Oglas oglas = tmpO;
            List<Slika> listaSlika =await _repo.PostaviSlike(slike);
            oglas.Slike = listaSlika;
            await AzurirajOglas(oglas);
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

        public async Task<Slika> VratiSliku(long oglasId, int slikaBr)
        {
            var oglas = _repo.VratiOglas(oglasId, o => o.Slike);
            if(oglas==null)
                throw new NullOglasException(oglasId);
            if(slikaBr>oglas.Slike.Count||slikaBr<0)
                throw new NullSlikaException(oglasId, slikaBr);
            oglas.Slike[slikaBr - 1].Data = await System.IO.File.ReadAllBytesAsync(oglas.Slike[slikaBr - 1].Path);
            return oglas.Slike[slikaBr - 1];
        }
    }
}