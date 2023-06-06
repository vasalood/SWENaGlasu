using Domain.Models;

namespace Services.Abs;


public interface IPorukaService
{

    public List<Poruka> VratiNaslovnePorukeZaKorisnika(string id);


    public List<Poruka> VratiPorukeZaOglas(long oglasId, string posiljaocId);

    public void PosaljiPoruku(PorukaDto dto);
    public void ObeleziProcitanim(long[] ids);
}