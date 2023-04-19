namespace Utility;

public class Order
{
    public OrderBy By {get;set;}
    public OrderType Type{ get; set; }

    public Order(OrderBy by, OrderType type)
    {
        By = by;
        Type = type;
    }
}