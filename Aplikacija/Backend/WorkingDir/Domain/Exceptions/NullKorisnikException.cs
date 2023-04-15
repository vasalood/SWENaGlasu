namespace Domain.Exceptions
{
    public class NullKorisnikException:Exception
    {
        public NullKorisnikException(int id):base($"Ne postoji korisnik sa id = {id}.")
        {
        }

    }
}