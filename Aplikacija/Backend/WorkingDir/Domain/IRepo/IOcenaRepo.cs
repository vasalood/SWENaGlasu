using Domain.Models;

namespace Domain.IRepo;

public interface IOcenaRepo
{
    Ocena? VratiOcenu(long id);
    Task<List<OcenaDto>> VratiMtihNOcena(string id,int M, int N);
    void SacuvajOcenu(Ocena ocena);
    int PrebrojOcene(string id);

    void AzurirajOcenu(Ocena ocena);
    void ObrisiOcenu(Ocena ocena);
}