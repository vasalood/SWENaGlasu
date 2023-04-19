namespace Domain.Models
{
     public enum TipOglasa
        {
            Proizvod=0,
            Usluga
        }

        public enum SmerOglasa
        {
            Nudi=0,
            Trazi
        }

        public enum Stanje
        {
            Novo_Neotpakovano,
            Novo_Nekorisceno,
            Polovno_Ocuvano,
            Polovno,
            Polovno_Neupotrebivo
        }
}
