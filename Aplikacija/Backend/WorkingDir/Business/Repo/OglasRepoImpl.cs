using Business.Contexts;
using Domain.IRepo;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Domain.Exceptions;
using System.Linq.Expressions;
using Domain.IRepo.Utility;
using Business.Repo.Utility;

namespace Business.Repo
{
    
    public class OglasRepoImpl : IOglasRepo
    {
        private IWebHostEnvironment _environment;
        private OrderByMapperOglas _orderByMapper;
        private const int  MAX_BR_SLIKA= 5;
        private const string SLIKE_FOLDER = "SlikeOglasa";
        private readonly string[] EXTENSIONS = new string[] {".jpg", ".png", ".jpeg" };
        //10MB
        private const long MAX_VELICINA_SLIKE = 10*0b1_00000_00000_00000_00000;
        private string FOLDER_PATH;
        private readonly NaGlasuContext _context;

        public OglasRepoImpl(NaGlasuContext context,IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
            FOLDER_PATH = Path.Combine(_environment.WebRootPath,SLIKE_FOLDER);
            _orderByMapper = new OrderByMapperOglas();
            if(!Directory.Exists(FOLDER_PATH))
            {
                Directory.CreateDirectory(FOLDER_PATH);
            }
        }

        public async Task<List<Slika>> PostaviSlike(List<IFormFile> slike)
        {
            if(slike.Count>MAX_BR_SLIKA)
                throw new MaxBrSlikaException(MAX_BR_SLIKA);

            List<Slika> Slike = new List<Slika>(slike.Count);

            foreach(IFormFile slika in slike)
            {
                //if(slika.ContentType!="image/jpeg"||slika.ContentType!="image/png") ne radi?
                    //return BadRequest($"Slika {slika.FileName} je nedozvoljenog tipa (dozvoljene su samo png i jpg slike)");
                String extension = Path.GetExtension(slika.FileName);
                if(!EXTENSIONS.Contains(extension))
                    throw new NedozvoljenaEkstenzijaException(extension);
                if(slika.Length>MAX_VELICINA_SLIKE)
                    throw new VeliakSlikaException(slika.FileName, MAX_VELICINA_SLIKE);
                string fPath;
                do {
                    fPath = Path.Combine(FOLDER_PATH,RandomString.GenerateFilename(extension));
                } while (System.IO.File.Exists(fPath));
                Slike.Add(new Slika(fPath));
            }

        for (int i = 0; i != slike.Count;++i)
        {
            using(FileStream fs = System.IO.File.Create(Slike[i].Path))
            {
                await slike[i].CopyToAsync(fs);
                fs.Flush();
            }
        }
            return Slike;
        }

        public async Task SacuvajOglas(Oglas oglas)
        {
            _context.Oglasi.Add(oglas);
            await _context.SaveChangesAsync();
        }   

        public async Task<int> PrebrojiOglaseZaFiltere(OglasFilteri? filters)
        {
            Expression<Func<Oglas, bool>> predicate = (o) => true;
            if(filters!=null)
                predicate = filters.Map();
            return await _context.Oglasi.Where(predicate).CountAsync();
        }

        public async Task<List<Oglas>> VratiMtihNOglasa(int N, int M, OglasFilteri? filteri)
        {
            Expression<Func<Oglas, bool>> predicate = (o) => true;
            if(filteri!=null)
                predicate = filteri.Map();
            var tmp = _context.Oglasi.Where(predicate).Skip(M * N).Take(N).Include(o => o.Podkategorija)
            .Include(o => o.Vlasnik)
             .Join(_context.Kategorije,
            o => o.Podkategorija.KategorijaId, k => k.Id, (o, k) =>
            new Oglas(o.Id, o.Ime, o.Podkategorija, k.Ime, o.Polja, o.Kredit, o.DatumPostavljanja, o.Smer, o.Tip,
            o.Cena, o.Kolicina, o.BrojPregleda, o.Vlasnik.Id, o.Vlasnik.UserName,o.Stanje,o.Lokacija));

            var list = await tmp.ToListAsync();
            if(list==null)
                list = new List<Oglas>();
            return list;
        }

        public Oglas? VratiOglas(long oglasId,Expression<Func<Oglas,object>>? lambda)
        {
            return lambda!=null?_context.Oglasi.Where(o=>o.Id==oglasId).Include(lambda).FirstOrDefault()
            :_context.Oglasi.Where(o=>o.Id==oglasId).FirstOrDefault();
        }

        public async Task<List<Oglas>> VratiOglase(long[] oglasIds, Expression<Func<Oglas, object>>? lambdaInclude)
        {
            return await (lambdaInclude != null ? _context.Oglasi.Where(o => oglasIds.Contains(o.Id)).Include(lambdaInclude).ToListAsync() :
            _context.Oglasi.Where(o => oglasIds.Contains(o.Id)).ToListAsync());
        }
    }
}