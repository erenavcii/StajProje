using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using StajProje.API.Data;
using StajProje.API.Models;

namespace StajProje.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class InvoiceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InvoiceController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpPost("save")]
        public async Task<IActionResult> InvoiceSave([FromBody] Invoice input)
        {
            input.User = null!;
            input.Customer = null!;
            input.UserId = GetUserId();
            input.RecordDate = DateTime.Now;

            foreach (var line in input.InvoiceLines)
            {
                line.User = null!;
                line.Invoice = null!;
                line.UserId = GetUserId();
                line.RecordDate = DateTime.Now;
            }

            _context.Invoices.Add(input);
            await _context.SaveChangesAsync();
            return Ok(input);
        }

        [HttpPut("update")]
        public async Task<IActionResult> InvoiceUpdate([FromBody] Invoice input)
        {
            var invoice = await _context.Invoices.FindAsync(input.InvoiceId);
            if (invoice == null)
                return NotFound("Fatura bulunamadı.");

            invoice.CustomerId = input.CustomerId;
            invoice.InvoiceNumber = input.InvoiceNumber;
            invoice.InvoiceDate = input.InvoiceDate;
            invoice.TotalAmount = input.TotalAmount;

            await _context.SaveChangesAsync();
            return Ok(invoice);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> InvoiceDelete([FromQuery] int invoiceId)
        {
            var invoice = await _context.Invoices.FindAsync(invoiceId);
            if (invoice == null)
                return NotFound("Fatura bulunamadı.");

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();
            return Ok("Fatura silindi.");
        }

        [HttpGet("list")]
        public async Task<IActionResult> InvoiceList([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var invoices = await _context.Invoices
                .Include(i => i.Customer)
                .Include(i => i.InvoiceLines)
                .Where(i => i.InvoiceDate >= startDate && i.InvoiceDate <= endDate)
                .ToListAsync();

            return Ok(invoices);
        }

        // ID'ye göre tek fatura getir, düzenleme formu için
        [HttpGet("{id}")]
        public async Task<IActionResult> InvoiceGetById(int id)
        {
            var invoice = await _context.Invoices
                .Include(i => i.Customer)
                .Include(i => i.InvoiceLines)
                .FirstOrDefaultAsync(i => i.InvoiceId == id);

            if (invoice == null)
                return NotFound("Fatura bulunamadı.");

            return Ok(invoice);
        }
    }
}