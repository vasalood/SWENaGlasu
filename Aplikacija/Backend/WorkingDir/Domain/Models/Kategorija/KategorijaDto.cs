using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models;

[NotMapped]
public class KategorijaDto
{
    [Required]
    [MaxLength(50)]
    public string Ime{ get; set; }
    public Dictionary<string,string> Polja{ get; set; }

    public List<String> Podkategorije{ get; set; }
}