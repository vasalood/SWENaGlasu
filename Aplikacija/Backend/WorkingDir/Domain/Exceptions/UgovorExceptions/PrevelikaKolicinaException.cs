namespace Domain.Exceptions;

public class PrevelikaKolicinaException:Exception
{
    public PrevelikaKolicinaException(int kolicina):base($"Ugovor ne moze da ima vecu kolicinu od Oglasa: {kolicina}"){}
}