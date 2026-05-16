import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.scss'
})
export class InvoiceList implements OnInit {

  invoices: any[] = [];
  startDate = '';
  endDate = '';

  constructor(
    private invoiceService: InvoiceService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];
    this.startDate = '2024-01-01';
    this.endDate = today;
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getList(this.startDate, this.endDate).subscribe({
      next: (data) => this.invoices = data,
      error: (err) => console.error('Faturalar yüklenemedi.', err)
    });
  }

  newInvoice() {
    this.router.navigate(['/invoice/new']);
  }

  editInvoice(id: number) {
    this.router.navigate(['/invoice/edit', id]);
  }

  deleteInvoice(invoice: any) {
    const confirmed = confirm('Faturayı silmek istediğinize emin misiniz?');
    if (!confirmed) return;

    this.invoiceService.delete(invoice.invoiceId).subscribe({
      next: () => {
        this.invoices = this.invoices.filter(i => i.invoiceId !== invoice.invoiceId);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Silme işlemi başarısız.', err)
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}