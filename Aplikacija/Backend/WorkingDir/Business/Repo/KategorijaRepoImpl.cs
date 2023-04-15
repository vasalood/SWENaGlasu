using Business.Contexts;
using Domain.IRepo;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Utility;

namespace Business.Repo
{
    public class KategorijaRepoImpl : IKategorijaRepo
    {
        private readonly NaGlasuContext _context;

        public KategorijaRepoImpl(NaGlasuContext context)
        {
            _context = context;
        }
        public async Task AzurirajKategoriju(Kategorija oldKategorija,Kategorija kategorija)
        {
            /*TODO:Mozda treba da bude implementirana promena imena
            Posto mora da se kategorija obrise da bi to radilo, pa onda da se prodje kroz bazu i svuda gde se javlja ime
            ili kljuc kategorije da se azurira, mozda je previse neprakticno*/ 

            oldKategorija.Podkategorije=kategorija.Podkategorije;
            oldKategorija.Polja=kategorija.Polja;

            await _context.SaveChangesAsync();
        }

        public async Task DodajKategoriju(Kategorija kategorija)
        {
            _context.Kategorije.Add(kategorija);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Kategorija>?> VratiKategorije(OrderType orderType)
        {
            var query = _context.Kategorije.Where(k => 1 == 1).OrderBy(k => k.Ime).Include(k => k.Podkategorije).Select(k => new
            Kategorija
            {
                Ime = k.Ime,
                Id = k.Id,
                Podkategorije = k.Podkategorije
            });
            if(orderType==OrderType.Ascending)
            {
                var tmp = await query.OrderBy(k=>k.Ime).ToListAsync();
                foreach(var iter in tmp)
                {
                    iter.Podkategorije.OrderBy(p => p.Ime);
                }
                return tmp;
            }
            else
            {
                var tmp = await query.OrderByDescending(k => k.Ime).ToListAsync();
                foreach(var iter in tmp)
                {
                    iter.Podkategorije.OrderBy(p => p.Ime);
                }
                return tmp;
            }
        }

        public Kategorija? VratiKategoriju(int id)
        {
            return _context.Kategorije.Where(k=>k.Id.Equals(id)).Include(k=>k.Podkategorije).FirstOrDefault();
        }

        public Task ObrisiKategoriju(Kategorija kategorija)
        {
            _context.Remove(kategorija);
            return _context.SaveChangesAsync();
        }
    }
}