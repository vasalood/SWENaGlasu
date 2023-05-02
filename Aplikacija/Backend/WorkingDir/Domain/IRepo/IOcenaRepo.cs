using Domain.Models;

namespace Domain.IRepo;

public interface IOcenaRepo
{
    Ocena? VratiOcenu(long id);
    Task<List<OcenaDto>> VratiOcene(string username,int M, int N);
    void SacuvajOcenu(Ocena ocena);
    int PrebrojOcene(string username);

    void AzurirajOcenu(Ocena ocena);
    void ObrisiOcenu(Ocena ocena);
}