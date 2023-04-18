namespace Controllers.Utils;

public class ZipFile
{
    public byte[] Data{ get; set; }
    public string Name{ get; set; }
    public ZipFile(byte[] data, string name)
    {
        Data = data;
        Name = name;
    }

    public const string CONTENT_TYPE= "application/zip";
}