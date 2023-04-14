using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Owned]
    public class Slika 
    {
        [Key]
        public int Id { get; set; }
        public string Path { get; set; }
    }
}