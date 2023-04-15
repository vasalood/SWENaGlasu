namespace Domain.Exceptions
{
    public class NedozvoljenaEkstenzijaException:Exception
    {
        public NedozvoljenaEkstenzijaException(string ekstenzija):base($"Nedozvoljena ekstenzija: {ekstenzija}.")
        {
        }

    }
}