import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { InvoiceList } from './components/invoice-list/invoice-list';
import { InvoiceForm } from './components/invoice-form/invoice-form';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'invoices', component: InvoiceList },
  { path: 'invoice/new', component: InvoiceForm },
  { path: 'invoice/edit/:id', component: InvoiceForm }
];