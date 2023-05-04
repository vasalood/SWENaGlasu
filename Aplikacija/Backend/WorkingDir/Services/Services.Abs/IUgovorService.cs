using Domain.Models;
using Utility;

namespace Services.Abs;

public interface IUgovorService
{
    Ugovor VratiUgovor(long Id);
    Task<List<Ugovor>> VratiMtihNUgovora(string id,int M,int N,bool? zaKupca, bool? prihvaceni,Order order);

    void UpisiUgovor(Ugovor ugovor);

    void ObrisiUgovor(long Id);

    void AzurirajUgovor(Ugovor ugovor);

    int PrebrojiUgovore(string id, bool? zaKupca, bool? prihvaceni);

}