namespace Services.Abs;
using Domain.Models;
public interface IOcenaService
{
    void Oceni(Ocena ocena);
    Task<List<OcenaDto>> VratiOcene(string username, int M, int N);
    int PrebrojOcene(string username);
    void ObrisiOcenu(long id);

    void AzurirajOcenu(OcenaDto dto);
    Ocena VratiOcenu(long id);
}