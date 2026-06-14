import { Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list';
import { BookDetailComponent } from './pages/book-detail/book-detail';
import { CartComponent } from './pages/cart/cart';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '' }
];
