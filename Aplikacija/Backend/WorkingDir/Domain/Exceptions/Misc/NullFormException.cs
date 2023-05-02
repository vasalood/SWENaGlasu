namespace Domain.Exceptions;

public class NullFormException:Exception
{
    public NullFormException(string property) : base($"Property: {property} mora da bude definisan.") { }
}