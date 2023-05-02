namespace Domain.Exceptions
{
    public class NullKorisnikException:Exception
    {
        public NullKorisnikException(string id):base($"Ne postoji korisnik sa id = {id}.")
        {
        }

    }
}