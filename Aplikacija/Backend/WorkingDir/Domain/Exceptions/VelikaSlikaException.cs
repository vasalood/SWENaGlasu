namespace Domain.Exceptions
{
    public class VeliakSlikaException:Exception
    {
        public VeliakSlikaException(string imeSlike,long maxVelicina):base($"Slika {imeSlike} je veca od dozvoljene velicine ({maxVelicina})")
        {
        }

    }
}