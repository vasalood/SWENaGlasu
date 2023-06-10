using Domain.Models;

namespace Services.Abs;


public interface IPorukaService
{

    public List<Poruka> VratiInbox(string id);

    public Poruka VratiNaslovnuPoruku(long chatId);
    public Chat VratiChat(long chatId);
    public Chat VratiIliKreirajChat(long oglasId, string strankaId);

    public long PosaljiPoruku(PorukaDto dto);
    public void ObeleziProcitanim(long[] ids);
    public void ObeleziProcitanom(long id);
}