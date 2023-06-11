namespace Domain.Models;

public class ChatPogled
{
    public long Id { get; set; }
    public string ZaOglasNaziv{ get; set; }
    public long ZaOglasId{ get; set; }
    public string ReceiverUsername{ get; set; }
    public List<PorukaPogled> Poruke{ get; set; }

    public string ZaOglasVlasnikId{ get; set; }
    public ChatPogled(){}

    public ChatPogled(long id, string zaOglasNaziv, long zaOglasId,string receiverUsername, List<Poruka> poruke,string zaOglasVlasnikId)
    {
        Id = id;
        ZaOglasNaziv = zaOglasNaziv;
        ZaOglasId = zaOglasId;
        ReceiverUsername = receiverUsername;
        Poruke = 
        poruke.Select
        (p => new PorukaPogled(p.Id, p.Timestamp, p.Sadrzaj, 
        p.Procitana, p.Chat.Id, p.Ugovor, p.Posiljaoc.Id)).ToList();
        ZaOglasVlasnikId = zaOglasVlasnikId;
    }
}