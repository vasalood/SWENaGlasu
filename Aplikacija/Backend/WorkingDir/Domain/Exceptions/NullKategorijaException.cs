namespace Domain.Exceptions
{
    public class NullKategorijaException:Exception
    {
        public NullKategorijaException(int id):base($"Ne postoji kategorija sa id = {id}.")
        {
        }

    }
}