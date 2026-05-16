import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.scss'
})
export class InvoiceForm implements OnInit {

  invoiceId: number | null = null;
  isEditMode = false;

  invoice: any = {
    customerId: null,
    invoiceNumber: '',
    invoiceDate: '',
    totalAmount: null,
    invoiceLines: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.invoiceId = +id;
      this.isEditMode = true;
      this.invoiceService.getById(this.invoiceId).subscribe({
        next: (data) => {
          this.invoice = {
            invoiceId: data.invoiceId,
            customerId: data.customerId,
            invoiceNumber: data.invoiceNumber,
            invoiceDate: data.invoiceDate.split('T')[0],
            totalAmount: data.totalAmount,
            invoiceLines: data.invoiceLines ?? []
          };
        },
        error: () => console.error('Fatura bilgileri getirilemedi.')
      });
    }
  }

  save() {
    if (this.isEditMode) {
      this.invoiceService.update(this.invoice).subscribe({
        next: () => this.router.navigate(['/invoices']),
        error: () => console.error('Güncelleme başarısız.')
      });
    } else {
      this.invoiceService.save(this.invoice).subscribe({
        next: () => this.router.navigate(['/invoices']),
        error: () => console.error('Kayıt başarısız.')
      });
    }
  }

  cancel() {
    this.router.navigate(['/invoices']);
  }
}