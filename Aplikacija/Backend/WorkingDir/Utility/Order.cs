namespace Utility;

public class Order
{
    public string By {get;set;}
    public OrderType Type{ get; set; }

    public Order(string by, OrderType type)
    {
        By = by;
        Type = type;
    }
}