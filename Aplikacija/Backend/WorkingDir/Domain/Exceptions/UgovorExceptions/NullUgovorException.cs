namespace Domain.Exceptions;

public class NullUgovorException:Exception
{
    public NullUgovorException(long Id):base($"Ugovor sa id: {Id} ne postoji."){}
}