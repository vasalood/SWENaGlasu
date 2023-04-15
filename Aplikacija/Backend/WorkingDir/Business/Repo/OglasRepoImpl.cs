using Business.Contexts;
using Domain.IRepo;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Domain.Exceptions;
using Services.Impl.Util;

namespace Business.Repo
{
    public class OglasRepoImpl : IOglasRepo
    {
        private IWebHostEnvironment _environment;
         private const int  MAX_BR_SLIKA= 5;
        private const string SLIKE_FOLDER = "SlikeOglasa";

    //10MB
        private const long MAX_VELICINA_SLIKE = 10*0b1_00000_00000_00000_00000;
        private string FOLDER_PATH;
        private readonly NaGlasuContext _context;

        public OglasRepoImpl(NaGlasuContext context,IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
            FOLDER_PATH = Path.Combine(_environment.WebRootPath,SLIKE_FOLDER);
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
                if(extension!=".png"&&extension!=".jpg")
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

        public async Task PostaviOglas(Oglas oglas)
        {
            oglas.DatumPostavljanja = DateTime.Now;
            _context.Oglasi.Add(oglas);
            await _context.SaveChangesAsync();
        }   

        public async Task<int> PrebrojiOglaseZaFiltere(object filters)
        {
            return await _context.Oglasi.Where(o => 1 == 1).CountAsync();

        }

        public async Task<List<Oglas>?> VratiMtihNOglasa(int N, int M, object filters)
        {
            var tmp = await _context.Oglasi.Where(o => 1 == 1/*Ovde idu filteri*/).Skip(M * N).Take(N).Include(o=>o.Podkategorija).Join(_context.Kategorije,
            o=>o.Kategorija.Id,k=>k.Id,(o,k)=>new Oglas(o.Id,o.Ime,k.Ime,k.Id,o.Podkategorija,o.Polja)).Join(_context.Korisnici,
            o=>o.Vlasnik.Id,k=>k.Id,(o,k)=>new Oglas(o.Id,o.Ime,k.Ime,k.Id,o.Podkategorija,o.Polja)).ToListAsync();

            return tmp;
        }

        public Oglas? VratiOglas(long oglasId)
        {
            return _context.Oglasi.Find(oglasId);
        }

        public async Task AzurirajOglas(Oglas oldOglas,Oglas oglas)
        {
            oldOglas.Cena = oglas.Cena;
            oldOglas.Ime = oglas.Ime;
            oldOglas.Slike = oglas.Slike;
            await _context.SaveChangesAsync();
        }
    }
}