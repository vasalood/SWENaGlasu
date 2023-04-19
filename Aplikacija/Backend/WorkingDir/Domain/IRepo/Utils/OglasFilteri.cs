using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.IRepo.Utils;

[NotMapped]
public class OglasFilteri
{
    public long? Id { get; set; }
    public int? KategorijaId { get; set; }
    public int[]? PodkategorijeId { get; set; }
    public string? Ime { get; set; }

    //public string? Grad {get;set;}

    public int? CenaOd { get; set; }
    public int? CenaDo { get; set; }
}