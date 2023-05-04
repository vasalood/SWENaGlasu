using Domain.Models;
using Services.Abs;
using Domain.IRepo;
using Domain.Exceptions;

namespace Services.Impl;

public class OcenaService:IOcenaService
{


    private readonly IOcenaRepo _repo;
    private readonly IUgovorService _ugovorService;
    public OcenaService(IOcenaRepo repo,IUgovorService ugovorService)
    {
        _repo = repo;
        _ugovorService = ugovorService;
    }
    public void Oceni(Ocena ocena)
    {
        ocena.Ugovor = _ugovorService.VratiUgovor(ocena.Ugovor.Id);
        if(!ocena.Ugovor.Prihvacen)
            throw new UgovorNeprihvacenException(ocena.Ugovor.Id);
        _repo.SacuvajOcenu(ocena);
    }

    public async Task<List<OcenaDto>> VratiMtihNOcena(string id,int M, int N)
    {
        return await _repo.VratiMtihNOcena(id,M,N);
    }

    public int PrebrojOcene(string id)
    {
        return _repo.PrebrojOcene(id);
    }

    public void ObrisiOcenu(long id)
    {
        var ocena = _repo.VratiOcenu(id);
        if(ocena==null)
            throw new NullOcenaException(id);
        _repo.ObrisiOcenu(ocena);
    }

    public Ocena VratiOcenu(long id)
    {
        var ocena= _repo.VratiOcenu(id);
        if(ocena==null)
            throw new NullOcenaException(id);
        return ocena;
    }
    public void AzurirajOcenu(OcenaDto dto)
    {
        if(dto.Id==null)
            throw new NullOcenaException(0);
        var ocena = VratiOcenu((long)dto.Id);
        ocena.Komentar = dto.Komentar;
        ocena.Vrednost = dto.Vrednost;
        _repo.AzurirajOcenu(ocena);
    }

}