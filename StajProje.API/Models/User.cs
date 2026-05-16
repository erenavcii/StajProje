namespace StajProje.API.Models
{
    public class User
    {
        public int UserId { get; set; } // primary key
        public string UserName { get; set; } = string.Empty;
        // şifre hash'lenmiş olarak tutulacak
        public string Password { get; set; } = string.Empty;
        public DateTime RecordDate { get; set; } = DateTime.Now;
    }
}