using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    [Owned]
    public class Slika 
    {
        [Key]
        public int Id { get; set; }
        public string Path { get; set; }

        public Slika(){}

        public Slika(string path)
        {
            Path = path;
        }
        public Slika(string path,int redosled)
        {
            Path = path;
            Redosled = redosled;
        }
        
        public Slika(string path,byte[] data)
        {
            Path = path;
            Data = data;
        }
        [NotMapped]
        [JsonIgnore]
        public byte[] Data{ get; set; }

        [NotMapped]
        [JsonIgnore]
        public string Naziv{ get
        {
                return System.IO.Path.GetFileName(Path)??"";
            }  }

        public long OglasId{ get; set; }

        public int Redosled{ get; set; }
    }
}