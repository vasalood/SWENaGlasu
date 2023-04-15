namespace Domain.Exceptions
{
    public class NullOglasException:Exception
    {
        public NullOglasException(long id):base($"Ne postoji oglas sa id: {id}")
        {}
    }
}