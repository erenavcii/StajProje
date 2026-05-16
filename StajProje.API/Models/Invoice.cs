namespace StajProje.API.Models
{
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
        // fatura numarası manuel girilecek, örn: FTR-2024-001
        public string InvoiceNumber { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; }
        public decimal TotalAmount { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime RecordDate { get; set; } = DateTime.Now;
        // faturanın kalemleri
        public List<InvoiceLine> InvoiceLines { get; set; } = new();
    }
}