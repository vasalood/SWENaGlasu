namespace Domain.Models;

public class NullSlikaException:Exception
{
    public NullSlikaException(long oglasId,int slikaBr):base($"Oglas sa id: {oglasId} nema sliku pod brojem: {slikaBr}"){}
}