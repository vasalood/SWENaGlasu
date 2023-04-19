using System.Linq.Expressions;

namespace Utility;

public abstract class OrderByMapper<T> 
{
    public abstract Expression<Func<T,object>> Map(OrderBy orderBy);
}