using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Models;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{

    public class Ocena
    {
        [Key]
        public long Id { get; set; }
        public int Vrednost { get; set; }
        public Ugovor Ugovor { get; set; }
        public String Komentar { get; set; }
        public DateTime Datum{ get; set; }

        public Ocena(){}

        public Ocena(OcenaDto dto)
        {
            Vrednost = dto.Vrednost;
            Komentar = dto.Komentar;
            Datum = DateTime.Now;
            Ugovor = new Ugovor
            {
                Id = dto.UgovorId
            };
        }
    }
}