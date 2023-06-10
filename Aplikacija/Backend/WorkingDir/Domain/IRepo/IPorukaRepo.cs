using Domain.Models;
using System.Linq.Expressions;
namespace Domain.IRepo;

public interface IPorukaRepo
{
    long UpisiPoruku(Poruka poruka);
    List<Poruka> VratiPoruke(long[] ids);
    List<Poruka> VratiInbox(string id);
    Chat VratiChat(long chatId);

    void AzurirajPoruku(Poruka poruka);

    Poruka VratiPoruku(long id,params Expression<Func<Poruka, object>>[]? lambdas);

    long KreirajChat(Chat chat);

    Chat? VratiChat(long oglasId, string strankaId);

    public Poruka VratiNaslovnuPoruku(long chatId);
}