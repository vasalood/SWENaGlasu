using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
    }
}