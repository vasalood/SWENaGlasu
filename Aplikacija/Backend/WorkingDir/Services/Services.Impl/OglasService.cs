using Domain.Models;
using Services.Abs;
using Domain.IRepo;
using Domain.Exceptions;
using Domain.IRepo.Utility;
using Services.Utility;
using System.Linq.Expressions;
using Utility;

namespace Services.Impl
{
    public class OglasService : IOglasService
    {
        private readonly IOglasRepo _repo;
        private readonly IKorisnikService _korisnikService;
        private readonly IKategorijaService _kategorijaService;

        private static object lockobj = new object();
        public OglasService(IOglasRepo repo, IKorisnikService korisnikService, IKategorijaService kategorijaService)
        {
            _repo = repo;
            _korisnikService = korisnikService;
            _kategorijaService = kategorijaService;
        }

        public void AzurirajOglas(Oglas oglas, OglasForm form)
        {
            oglas.Ime = form.Ime??oglas.Ime;
            oglas.Cena = form.Cena??oglas.Cena;
            oglas.Kolicina = form.Kolicina??oglas.Kolicina;
            oglas.Kredit = form.Kredit??oglas.Kredit;
            if(form.StavkePoljaImena!=null&&form.StavkePoljaVrednosti!=null)
            {
                oglas.Polja = new Dictionary<string, string>();
                int count = int.Min(form.StavkePoljaImena.Count(), form.StavkePoljaVrednosti.Count());
                for (int i = 0; i != count;++i)
                {
                    oglas.Polja.Add(form.StavkePoljaImena[i], form.StavkePoljaVrednosti[i]);
                }
            }
           
            Kategorija? kat = form.KategorijaId!=null?_kategorijaService.VratiKategoriju((int)form.KategorijaId):null;
            if(kat!=null)
                oglas.Podkategorija = kat.Podkategorije.Find(p => p.Id == form.PodkategorijaId) ?? oglas.Podkategorija;
            _repo.AzurirajOglas(oglas);
        }

        public async Task PostaviOglas(OglasForm form)
        {
            
            Oglas oglas = new Oglas(form);
            
            oglas.DatumPostavljanja = DateTime.Now;
            oglas.Vlasnik = _korisnikService.VratiKorisnika(oglas.Vlasnik.Id);
            var kategorija = _kategorijaService.VratiKategoriju((int)form.KategorijaId);
            if (kategorija == null)
                throw new NullKategorijaException((int)form.KategorijaId);
            var podkategorija = kategorija.Podkategorije.Find(p => p.Id == form.PodkategorijaId);
            if (podkategorija == null)
                throw new NullPodkategorijaException((int)form.PodkategorijaId);
            //podkategorija.KategorijaNaziv = kategorija.Ime;
            oglas.Podkategorija = podkategorija;
            oglas.Slike = form.PrimljeneSlike != null ? await _repo.PostaviSlike(form.PrimljeneSlike) : null;
            await _repo.SacuvajOglas(oglas);
        }

        public async Task<int> PrebrojiOglaseZaFiltere(OglasFilteri? filters)
        {
            return await _repo.PrebrojiOglaseZaFiltere(filters);
        }

        public async Task<List<Oglas>> VratiMtihNOglasa(int N, int M, OglasFilteri? filters,Order order)
        {
            //Ovo moze da se prepravi da se salje i korisnik i odma da se proveri da li su oglasi favoriti
            var tmp = await _repo.VratiMtihNOglasa(N, M, filters,order);
            if (tmp == null)
                tmp = new List<Oglas>();
            return tmp;
        }

        public async Task<List<Slika>> VratiSlike(long oglasId)
        {
            var oglas = _repo.VratiOglas(oglasId, o => o.Slike);
            if (oglas == null)
                throw new NullOglasException(oglasId);
            if (oglas.Slike == null || oglas.Slike.Count == 0)
                return new List<Slika>();
            oglas.Slike=oglas.Slike.OrderBy(o => o.Redosled).ToList();
            for (int i = 0; i != oglas.Slike.Count; ++i)
            {
                oglas.Slike[i].Data = await System.IO.File.ReadAllBytesAsync(oglas.Slike[i].Path);
            }
            return oglas.Slike;
        }

        public Oglas VratiOglas(long id, params Expression<Func<Oglas, object>>[]? lambdas)
        {
            var oglas = _repo.VratiOglas(id, lambdas);
            if (oglas == null)
                throw new NullOglasException(id);
            return oglas;
        }

        public async Task<List<Slika>> VratiNaslovneSlike(long[] oglasIds)
        {
            List<Oglas> tmp = await _repo.VratiOglase(oglasIds, o => o.Slike);
            List<Slika>? slike = tmp.Where(o => o.Slike != null).Select(o => o.Slike[0]).ToList(); ;
            if (slike == null)
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

        public void DodajFavorita(FavoritSpoj favorit)
        {
            _repo.DodajFavorita(favorit);
        }
        public void SkiniFavorita(int Id)
        {
            _repo.SkiniFavorita(Id);
        }

        public bool JelFavorit(long oglasId, string id)
        {
            return _repo.JelFavorit(oglasId, id);
        }

        public void InkrementOglasPregledi(long id)
        {
            lock(lockobj)
            {
                var oglas = _repo.VratiOglas(id,null);
                if(oglas==null)
                    throw new NullOglasException(id);
                oglas.BrojPregleda++;
                _repo.AzurirajOglas(oglas);
            }
            
        }
        public async Task<List<Oglas>> VratiFavorite(string userId,int M, int N,Order order)
        {
            return await _repo.VratiFavorite(userId, M, N,order);
        }

        public int PrebrojiFavorite(string userId)
        {
            return _repo.PrebrojiFavorite(userId);
        }

        public byte[] VratiSliku(string naziv)
        {
            return _repo.VratiSliku(naziv);
        }

        public void ObrisiOglas(long id)
        {
            var o = _repo.VratiOglas(id,null);
            if(o == null )
                throw new NullOglasException(id);
            else
                _repo.ObrisiOglas(o);
        }
    }
}