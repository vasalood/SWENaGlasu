namespace Domain.Exceptions;

public class NullOcenaException :Exception
{
    public NullOcenaException(long id):base($"Ne postoji ocena sa id: {id}."){}
}