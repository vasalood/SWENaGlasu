namespace Domain.Exceptions;

public class NullFavoritSpojException:Exception
{
    public NullFavoritSpojException():base("Nepostojeci favorit."){}
}