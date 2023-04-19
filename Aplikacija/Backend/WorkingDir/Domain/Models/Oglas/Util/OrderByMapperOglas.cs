using System.Linq.Expressions;
using Domain.Exceptions;
using Utility;

namespace Domain.Models;

public class OrderByMapperOglas : OrderByMapper<Oglas>
{
    public override Expression<Func<Oglas,object>> Map( OrderBy orderBy)
    {
        switch(orderBy)
        {
            case OrderBy.Alphabet:
                return (o) => o.Ime;
            case OrderBy.Date:
                return (o) => o.DatumPostavljanja;
            case OrderBy.Popularnost:
                return o => o.BrojPregleda;
            case OrderBy.Price:
                return o => o.Cena;
            default:
                throw new UnimplementedMappingException("OrderByMapperOglas");
        }
    }
}