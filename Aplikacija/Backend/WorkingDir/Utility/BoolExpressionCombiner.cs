using System.Linq.Expressions;

namespace Utility;

public class BoolExpressionCombiner<T>
{
    public static Expression<Func<T,bool>> CombineAnd( List<Expression<Func<T,bool>>> list)
    {
        if(list.Count()<2)
        {
            if(list.Count()==1)
                return list[0];
            else
                throw new ArgumentNullException("BoolExpressionCombiner doesn't work with empty lists.");
        }
        var e = list[0];
        for (int i = 1; i != list.Count();++i)
        {
            var e2 = list[i];
            e2 = ParameterReplacer.Replace<Func<T,bool>,Func<T,bool>>(e2, e2.Parameters[0], e.Parameters[0]);
            var body = Expression<Func<T,bool>>.AndAlso(e.Body, e2.Body);
            e = Expression.Lambda<Func<T,bool>>(body,e.Parameters);
        }
        return e;
    }

    public static Expression<Func<T,bool>> CombineAnd(params Expression<Func<T,bool>>[] list)
    {
        return CombineAnd(new List<Expression<Func<T, bool>>>(list));
    }
}

public static class ParameterReplacer
{
    // Produces an expression identical to 'expression'
    // except with 'source' parameter replaced with 'target' expression.     
    public static Expression<TOutput> Replace<TInput, TOutput>
                    (Expression<TInput> expression,
                    ParameterExpression source,
                    Expression target)
    {
        return new ParameterReplacerVisitor<TOutput>(source, target)
                    .VisitAndConvert(expression);
    }

    private class ParameterReplacerVisitor<TOutput> : ExpressionVisitor
    {
        private ParameterExpression _source;
        private Expression _target;

        public ParameterReplacerVisitor
                (ParameterExpression source, Expression target)
        {
            _source = source;
            _target = target;
        }

        internal Expression<TOutput> VisitAndConvert<T>(Expression<T> root)
        {
            return (Expression<TOutput>)VisitLambda(root);
        }

        protected override Expression VisitLambda<T>(Expression<T> node)
        {
            // Leave all parameters alone except the one we want to replace.
            var parameters = node.Parameters
                                 .Where(p => p != _source);

            return Expression.Lambda<TOutput>(Visit(node.Body), parameters);
        }

        protected override Expression VisitParameter(ParameterExpression node)
        {
            // Replace the source with the target, visit other params as usual.
            return node == _source ? _target : base.VisitParameter(node);
        }
    }
}