using Domain.Models;
using Services.Abs;
using Domain.IRepo;
using Domain.Exceptions;
using Domain.IRepo.Utility;
using Services.Utility;

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
            oldOglas.Polja = oglas.Polja;
            oldOglas.Cena = oglas.Cena;
            oldOglas.Slike = oglas.Slike;
            await _repo.SacuvajOglas(oldOglas);
        }

        public async Task PostaviOglas(OglasDto oglasDto)
        {
            Oglas oglas = new Oglas(oglasDto);
            oglas.DatumPostavljanja = DateTime.Now;
            oglas.Vlasnik= _korisnikService.VratiKorisnika(oglas.Vlasnik.Id);
            var kategorija = _kategorijaService.VratiKategoriju(oglasDto.Podkategorija.KategorijaId);
            if(kategorija==null)
                throw new NullKategorijaException(oglasDto.Podkategorija.KategorijaId);
            var podkategorija = kategorija.Podkategorije.Find(p => p.Id == oglasDto.Podkategorija.Id);
            if(podkategorija==null)
                throw new NullPodkategorijaException(oglasDto.Podkategorija.Id);
            //podkategorija.KategorijaNaziv = kategorija.Ime;
            oglas.Podkategorija =podkategorija;
            oglas.Slike=await _repo.PostaviSlike(oglasDto.PrimljeneSlike);
            await _repo.SacuvajOglas(oglas);
        }

        public async Task<int> PrebrojiOglaseZaFiltere(OglasFilteri? filters)
        {
            return await _repo.PrebrojiOglaseZaFiltere(filters);
        }

        public async Task<List<Oglas>> VratiMtihNOglasa(int N, int M, OglasFilteri? filters)
        {
            var tmp = await _repo.VratiMtihNOglasa(N, M, filters);
            if(tmp==null)
                tmp = new List<Oglas>();
            return tmp;
        }

        public async Task<List<Slika>> VratiSlike(long oglasId)
        {
            var oglas = _repo.VratiOglas(oglasId, o => o.Slike);
            if(oglas==null)
                throw new NullOglasException(oglasId);
            if(oglas.Slike.Count==0)
                return new List<Slika> ();
            for(int i=0;i!=oglas.Slike.Count;++i)
            {
                oglas.Slike[i].Data = await System.IO.File.ReadAllBytesAsync(oglas.Slike[i].Path);
            }
            return oglas.Slike;
        }

        public Oglas VratiOglas(long id)
        {
            var oglas = _repo.VratiOglas(id, o => o.Podkategorija);
            if(oglas==null)
                throw new NullOglasException(id);
            return oglas;
        }

        public async Task<List<Slika>> VratiNaslovneSlike(long[] oglasIds)
        {
            List<Oglas> tmp = await _repo.VratiOglase(oglasIds, o => o.Slike);
            List<Slika>? slike = tmp.Where(o=>o.Slike!=null).Select(o=>o.Slike[0]).ToList();;
            if(slike==null)
               return new List<Slika>();
            return slike;


        }

        public async Task<ZipFile> VratiNaslovneSlikeZIP(long[] oglasIds)
        {
            return await ZipCreator.ZipujNSlike(await VratiNaslovneSlike(oglasIds));
        }

        public async Task<ZipFile> VratiSlikeZIP(long oglasId)
        {
            return await ZipCreator.ZipujSlike(await VratiSlike(oglasId));
        }
    }
}