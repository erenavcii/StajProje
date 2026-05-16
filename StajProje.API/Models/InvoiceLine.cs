namespace StajProje.API.Models
{
    public class InvoiceLine
    {
        public int InvoiceLineId { get; set; }
        public int InvoiceId { get; set; }
        public Invoice? Invoice { get; set; }
        public string ItemName { get; set; } = string.Empty;
        // taskta Quentity yazıyor, yazım hatası ama DB ile uyumlu olsun
        public int Quentity { get; set; }
        public decimal Price { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime RecordDate { get; set; } = DateTime.Now;
    }
}