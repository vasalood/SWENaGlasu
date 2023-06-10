namespace Domain.Models;

public class PorukaDto
{
    public long Timestamp { get; set; }

    public long ChatId{ get; set; }
    public string? Sadrzaj{ get; set;}
    public string PosiljaocId{ get; set; }
    public bool Procitana { get; set; }
    public long? UgovorId{ get; set; }

    public string ReceiverUsername{ get; set; }

}