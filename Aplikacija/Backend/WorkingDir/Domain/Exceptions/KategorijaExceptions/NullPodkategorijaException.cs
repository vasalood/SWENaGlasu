namespace Domain.Exceptions
{
    public class NullPodkategorijaException:Exception
    {
        public NullPodkategorijaException(int id):base($"Ne postoji podkategorija sa id = {id}.")
        {
        }

    }
}