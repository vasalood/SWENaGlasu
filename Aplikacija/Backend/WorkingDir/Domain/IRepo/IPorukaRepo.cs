using Domain.Models;

namespace Domain.IRepo;

public interface IPorukaRepo
{
    void UpisiPoruku(Poruka poruka);
    List<Poruka> VratiPoruke(long[] ids);
    List<Poruka> VratiNaslovnePorukeZaKorisnika(string id);
    List<Poruka> VratiPorukeZaOglas(long oglasId, string strankaId);

    void AzurirajPoruku(Poruka poruka);
}