namespace StajProje.API.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        // vergi numarası, unique olmalı
        public string TaxNumber { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string EMail { get; set; } = string.Empty;
        // kaydı kim oluşturdu
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public DateTime RecordDate { get; set; } = DateTime.Now;
    }
}