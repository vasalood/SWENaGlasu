namespace Domain.Models;

public class PorukaPogled
{
    public long Id { get; set; }
    public long Timestamp{ get; set; }
    public long ChatId{ get; set; }
    public string? Sadrzaj{ get; set;}
    public bool Procitana { get; set; }
    public UgovorPorukaDto? Ugovor{ get; set; }

    public string PosiljaocId{ get; set; }
    public PorukaPogled(){}

    public PorukaPogled(long id, long timestamp, 
    string? sadrzaj, bool procitana,long chatId,Ugovor? ugovor,string posiljaocId)
    {
        Id = id;
        Timestamp = timestamp;
        Sadrzaj = sadrzaj;
        Procitana = procitana;
        ChatId = chatId;
        if(ugovor!=null)
        {
            Ugovor = new UgovorPorukaDto(ugovor.Opis, ugovor.Kolicina, ugovor.Prihvacen,ugovor.Odbijen, ugovor.Id);
        }
        PosiljaocId = posiljaocId;
    }
}