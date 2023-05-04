using System.ComponentModel.DataAnnotations.Schema;
using System.Linq.Expressions;
using Domain.Models;
using Utility;

namespace Domain.IRepo.Utility;

[NotMapped]
public class OglasFilteri
{
    public string? Username { get; set; }
    public string? UserId{ get; set; }
    public int? KategorijaId { get; set; }
    public int[]? PodkategorijeId { get; set; }
    public string? Ime { get; set; }

    public string? Lokacija {get;set;}

    public int? CenaOd { get; set; }
    public int? CenaDo { get; set; }

    private static readonly Expression<Func<Oglas, bool>> _defaultLambda = o => true;

     public Expression<Func<Oglas,bool>> Map()
    {
        
        Expression<Func<Oglas, bool>> username=  Username!=null? o => o.Vlasnik.UserName == Username:_defaultLambda;
        Expression<Func<Oglas, bool>> userId=  UserId!=null? o => o.Vlasnik.Id == UserId:_defaultLambda;
        Expression<Func<Oglas, bool>> cenaOd = CenaOd != null ? o => o.Cena >= CenaOd : _defaultLambda;
        Expression<Func<Oglas,bool>> cenaDo = CenaDo != null ? o => o.Cena <= CenaDo :_defaultLambda;
        Expression<Func<Oglas,bool>> lokacija = Lokacija != null ? o => o.Lokacija ==Lokacija :_defaultLambda;
        Expression<Func<Oglas, bool>> ime = Ime != null ?
         o => 
            o.Ime.Contains(Ime)
         : _defaultLambda;
        Expression<Func<Oglas, bool>> kategorija = KategorijaId != null ? o => o.Podkategorija.KategorijaId
         == KategorijaId : _defaultLambda;
        Expression<Func<Oglas, bool>> podkategorija = PodkategorijeId != null ? o => PodkategorijeId.Contains(
            o.Podkategorija.Id):
        _defaultLambda;

        return CombineAnd(username,cenaOd, cenaDo, ime, kategorija, podkategorija,lokacija);
    }

    private Expression<Func<Oglas,bool>> CombineAnd( List<Expression<Func<Oglas,bool>>> list)
    {
        if(list.Count()<2)
        {
            if(list.Count()==1)
                return list[0];
            else
                throw new ArgumentNullException("Nemoguce je kombinovati izraze iz prazne liste.");
        }
        var e = list[0];
        for (int i = 1; i != list.Count();++i)
        {
            var e2 = list[i];
            e2 = ParameterReplacer.Replace<Func<Oglas,bool>,Func<Oglas,bool>>(e2, e2.Parameters[0], e.Parameters[0]);
            var body = Expression<Func<Oglas,bool>>.AndAlso(e.Body, e2.Body);
            e = Expression.Lambda<Func<Oglas,bool>>(body,e.Parameters);
        }
        return e;
    }

    private Expression<Func<Oglas,bool>> CombineAnd(params Expression<Func<Oglas,bool>>[] list)
    {
        return CombineAnd(new List<Expression<Func<Oglas, bool>>>(list));
    }


}