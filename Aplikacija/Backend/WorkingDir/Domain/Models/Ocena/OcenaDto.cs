namespace Domain.Models;

public class OcenaDto
{
    public String Komentar{ get; set; }
    public int Vrednost { get; set; }
    public long UgovorId{ get; set; }
    public long? Id{ get; set; }
    public string? OglasIme{ get; set; }
    public string? Username { get; set; }
}