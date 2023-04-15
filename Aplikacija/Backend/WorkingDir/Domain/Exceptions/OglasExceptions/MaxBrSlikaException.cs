namespace Domain.Exceptions
{
    public class MaxBrSlikaException:Exception
    {
        public MaxBrSlikaException(int max):base($"Broj slika veci od dozvoljenog ({max})")
        {
        }

    }
}