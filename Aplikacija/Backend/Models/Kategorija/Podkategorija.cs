using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    [Owned]

   /*Podkategorija je slab tip entiteta koji poseduje Kategorija. Ime nije jedinstveni identifikator, vec je jedan deo kompozitnog kljuca,
    ///ciji je drugi deo kolona KategorijaId, koja ne postoji kao property u objektnom modelu. Property Id je automatski generisan od strane
    ///baze, i jedinstveno identifikuje podkategoriju globalno. To je uradjeno tako da bi poboljsalo performanse kod filtriranja i pretrage.*/
    public class Podkategorija
    {
        [MaxLength(50)]
        public string Ime{get;set;}

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id{get;set;}
    }
}