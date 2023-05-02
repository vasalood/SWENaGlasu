namespace Domain.Exceptions;

public class UgovorNeprihvacenException:Exception
{
    public UgovorNeprihvacenException(long id):base($"Ugovor sa id: {id} nije prihvacen."){}
}