using System.IO.Compression;
using Domain.Models;

namespace Services.Utility;

public class ZipCreator
{
    public async static Task<ZipFile> ZipujSlike(List<Slika> slike)
    {
        string name = slike[0].OglasId+".zip";
        using (MemoryStream ms = new MemoryStream())
        {
            var zip = new System.IO.Compression.ZipArchive(ms,System.IO.Compression.ZipArchiveMode.Create,true);
            foreach(Slika slika in slike)
            {

                var entry = zip.CreateEntry(Path.GetFileName(slika.Path));
                using(var entryStream = entry.Open())
                using(var slikaStream=new MemoryStream(slika.Data))
                {
                    await slikaStream.CopyToAsync(entryStream);
                }
            }
            return new ZipFile(ms.ToArray(), name);
        }
    }

    public async static Task<ZipFile> ZipujNSlike(List<Slika> slike)
    {
        string name = "slike.zip";
        using (MemoryStream ms = new MemoryStream())
        {
            var zip = new System.IO.Compression.ZipArchive(ms,System.IO.Compression.ZipArchiveMode.Create,true);
            foreach(Slika slika in slike)
            {

                var entry = zip.CreateEntry($"{slika.OglasId}"+Path.GetExtension(slika.Path));
                using(var entryStream = entry.Open())
                using(var slikaStream=new FileStream(slika.Path,FileMode.Open))
                {
                    await slikaStream.CopyToAsync(entryStream);
                }
            }
            return new ZipFile(ms.ToArray(), name);
        }
    }
}