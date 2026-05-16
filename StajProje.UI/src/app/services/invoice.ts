import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiUrl = 'http://localhost:5224/api/Invoice';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`
    });
  }

  getList(startDate: string, endDate: string) {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<any[]>(`${this.apiUrl}/list`, { headers: this.getHeaders(), params });
  }

  getById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  save(invoice: any) {
    return this.http.post(`${this.apiUrl}/save`, invoice, { headers: this.getHeaders() });
  }

  update(invoice: any) {
    return this.http.put(`${this.apiUrl}/update`, invoice, { headers: this.getHeaders() });
  }

  delete(invoiceId: number) {
    return this.http.delete(`${this.apiUrl}/delete?invoiceId=${invoiceId}`, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }
}