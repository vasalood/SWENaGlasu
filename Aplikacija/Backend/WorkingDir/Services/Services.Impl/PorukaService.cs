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

    public void PosaljiPoruku(PorukaDto dto)
    {
        Poruka p = new Poruka(dto);
        _repo.UpisiPoruku(p);
    }

    public List<Poruka> VratiNaslovnePorukeZaKorisnika(string id)
    {
        return _repo.VratiNaslovnePorukeZaKorisnika(id);
    }

    public List<Poruka> VratiPorukeZaOglas(long oglasId, string posiljaocId)
    {
        return _repo.VratiPorukeZaOglas(oglasId, posiljaocId);
    }
}