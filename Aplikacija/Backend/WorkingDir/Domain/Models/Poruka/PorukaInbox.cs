namespace Domain.Models;

public class PorukaInbox
{
    public long ChatId{ get; set; }
    public string? NaslovnaSlika{ get; set; }
    public string OglasNaziv{ get; set; }
    public long Timestamp{ get; set; }

    public string StrankaUsername{ get; set; }
    public string VlasnikOglasaUsername{ get; set; }
    public bool Procitana{ get; set; }

    public PorukaInbox(){}

    public PorukaInbox(long chatId,string? naslovnaSlika,
    string oglasNaziv,long timestamp,string strankaUsername,string vlasnikOglasaUsername,bool procitana)
    {
        ChatId = chatId;
        NaslovnaSlika = naslovnaSlika;
        OglasNaziv = oglasNaziv;
        Timestamp=timestamp;
        StrankaUsername = strankaUsername;
        VlasnikOglasaUsername = vlasnikOglasaUsername;
        Procitana = procitana;
    }
}