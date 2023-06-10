using Domain.IRepo;
using Domain.Models;
using Services.Abs;

namespace Services.Impl;

public class PorukaService : IPorukaService
{

    private IPorukaRepo _repo;

    public PorukaService(IPorukaRepo repo)
    {
        _repo = repo;
    }


    public void ObeleziProcitanim(long[] ids)
    {
        List<Poruka> list = _repo.VratiPoruke(ids);
        if(list.Count()!=0)
            foreach(var p in list)
            {
                p.Procitana = true;
                _repo.AzurirajPoruku(p);
            }
    }

        public void ObeleziProcitanom(long id)
    {
        Poruka poruka = _repo.VratiPoruku(id);
        poruka.Procitana = true;
        _repo.AzurirajPoruku(poruka);
    }


    public long PosaljiPoruku(PorukaDto dto)
    {
        Poruka p = new Poruka(dto);
        return _repo.UpisiPoruku(p);

    }

    public List<Poruka> VratiInbox(string id)
    {
        return _repo.VratiInbox(id);
    }

    public Chat VratiChat(long chatId)
    {
        return _repo.VratiChat(chatId);
    }

    public Chat VratiIliKreirajChat(long oglasId,string strankaId)
    {
        var chat = _repo.VratiChat(oglasId, strankaId);
        if(chat==null)
        {
            chat = new Chat
            {
                ZaOglas = new Oglas { Id = oglasId },
                Stranka = new Models.Korisnik { Id = strankaId }
            };
            long chatId = _repo.KreirajChat(chat);
            chat=_repo.VratiChat(chatId);
        }
        return chat;
    }

     public Poruka VratiNaslovnuPoruku(long chatId)
    {
        return _repo.VratiNaslovnuPoruku(chatId);
    } 
}