using System.Linq.Expressions;
using Domain.Models;
using Utility;

namespace Domain.IRepo.Utils;

public class OglasFilterMapper
{

    private static readonly Expression<Func<Oglas, bool>> defaultLambda = o => 1 == 1;
    public Expression<Func<Oglas,bool>> Map(OglasFilteri? filteri)
    {
        
        if(filteri==null)
            return defaultLambda;
        if(filteri.Id!=null)
            return o => o.Vlasnik.Id == filteri.Id;
        var param = Expression.Parameter(typeof(Oglas),"o");
        Expression<Func<Oglas, bool>> cenaOd = filteri.CenaOd != null ? o => o.Cena >= filteri.CenaOd : defaultLambda;
        Expression<Func<Oglas,bool>> cenaDo = filteri.CenaDo != null ? o => o.Cena <= filteri.CenaDo :defaultLambda;
        Expression<Func<Oglas, bool>> ime = filteri.Ime != null ? o => o.Ime == filteri.Ime : defaultLambda;
        Expression<Func<Oglas, bool>> kategorija = filteri.KategorijaId != null ? o => o.Podkategorija.KategorijaId
         == filteri.KategorijaId : defaultLambda;
        Expression<Func<Oglas, bool>> podkategorija = filteri.PodkategorijeId != null ? o => filteri.PodkategorijeId.Contains(
            o.Podkategorija.Id):
        defaultLambda;

        return BoolExpressionCombiner<Oglas>.CombineAnd(cenaOd, cenaDo, ime, kategorija, podkategorija);
    }
}