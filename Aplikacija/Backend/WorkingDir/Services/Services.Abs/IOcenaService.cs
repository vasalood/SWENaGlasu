namespace Services.Abs;
using Domain.Models;
public interface IOcenaService
{
    void Oceni(Ocena ocena);
    Task<List<OcenaDto>> VratiMtihNOcena(string id, int M, int N);
    int PrebrojOcene(string id);
    void ObrisiOcenu(long id);

    void AzurirajOcenu(OcenaDto dto);
    Ocena VratiOcenu(long id);
}