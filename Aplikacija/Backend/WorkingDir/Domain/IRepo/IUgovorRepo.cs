using Domain.Models;

namespace Domain.IRepo;

public interface IUgovorRepo
{
    Ugovor? VratiUgovor(long Id);
    Task<List<Ugovor>> VratiMtihNUgovora(string username,int M,int N);

    void UpisiUgovor(Ugovor ugovor);

    void ObrisiUgovor(Ugovor ugovor);

    void AzurirajUgovor(Ugovor ugovor);



}