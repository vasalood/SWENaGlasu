using Domain.Models;
using Utility;

namespace Domain.IRepo;

public interface IUgovorRepo
{
    Ugovor? VratiUgovor(long Id);
    Task<List<Ugovor>> VratiMtihNUgovora(string id,int M,int N,bool? zaKupca,bool? potvrdjeni,Order order);

    void UpisiUgovor(Ugovor ugovor);

    void ObrisiUgovor(Ugovor ugovor);

    void AzurirajUgovor(Ugovor ugovor);

    int PrebrojiUgovore(string id, bool? zaKupca, bool? potvrdjeni);
}