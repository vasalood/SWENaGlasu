using Domain.Models;

namespace Services.Abs;

public interface IUgovorService
{
    Ugovor VratiUgovor(long Id);
    Task<List<Ugovor>> VratiMtihNUgovora(string username,int M,int N);

    void UpisiUgovor(Ugovor ugovor);

    void ObrisiUgovor(long Id);

    void AzurirajUgovor(Ugovor ugovor);

}