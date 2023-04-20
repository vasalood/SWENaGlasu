using Domain.Models;
using Services.Abs;
using Domain.IRepo;
using Domain.Exceptions;
using Domain.IRepo.Utility;
using Services.Utility;
using System.Linq.Expressions;

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

        public async Task AzurirajOglas(Oglas oglas,OglasDto nOglas)
        {
            oglas.Ime = nOglas.Ime;
            oglas.BrojPregleda = nOglas.BrojPregleda;
            oglas.Cena = nOglas.Cena;
            oglas.Kolicina = nOglas.Kolicina;
            oglas.Kredit = nOglas.Kredit;
            oglas.Polja = nOglas.Polja;
            Kategorija kat = _kategorijaService.VratiKategoriju(nOglas.Podkategorija.KategorijaId);
            oglas.Podkategorija = kat.Podkategorije.Find(p=>p.Id==nOglas.Podkategorija.Id)??oglas.Podkategorija;
            await _repo.AzurirajOglas(oglas);
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
            oglas.Slike=oglasDto.PrimljeneSlike!=null?await _repo.PostaviSlike(oglasDto.PrimljeneSlike):null;
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
            if(oglas.Slike==null||oglas.Slike.Count==0)
                return new List<Slika> ();
            for(int i=0;i!=oglas.Slike.Count;++i)
            {
                oglas.Slike[i].Data = await System.IO.File.ReadAllBytesAsync(oglas.Slike[i].Path);
            }
            return oglas.Slike;
        }

        public Oglas VratiOglas(long id,Expression<Func<Oglas,object>>? predicate=null)
        {
            var oglas = predicate==null?_repo.VratiOglas(id, o => o.Podkategorija):_repo.VratiOglas(id,predicate);
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

        public async Task OceniOglas(long oglasId, OcenaDto ocenaDto)
        {
            Ocena ocena = new Ocena(ocenaDto);
            ocena.Oglas = VratiOglas(oglasId,o=>o.Ocene);
            ocena.Vlasnik = _korisnikService.VratiKorisnika(ocena.Vlasnik.Id);

            ocena.Oglas.Ocene.Add(ocena);

            await _repo.AzurirajOglas(ocena.Oglas);
        }
    }
}