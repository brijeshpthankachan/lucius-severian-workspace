import { Injectable, signal, computed, inject } from '@angular/core';
import { Book, CartItem } from '../models/book';
import { AnalyticsService } from './analytics.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = signal<CartItem[]>([]);
  private analytics = inject(AnalyticsService);

  readonly cartItems = computed(() => this.items());
  readonly totalItems = computed(() => this.items().reduce((acc, item) => acc + item.quantity, 0));
  readonly totalPrice = computed(() => this.items().reduce((acc, item) => acc + (item.book.price * item.quantity), 0));

  addToCart(book: Book) {
    this.analytics.trackEvent('cart_add', { 
      book_id: book.id, 
      book_title: book.title,
      price: book.price
    });
    this.items.update(currentItems => {
      const existingItem = currentItems.find(item => item.book.id === book.id);
      if (existingItem) {
        return currentItems.map(item => 
          item.book.id === book.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...currentItems, { book, quantity: 1 }];
    });
  }

  removeFromCart(bookId: string) {
    const item = this.items().find(i => i.book.id === bookId);
    if (item) {
      this.analytics.trackEvent('cart_remove', { 
        book_id: bookId, 
        book_title: item.book.title 
      });
    }
    this.items.update(currentItems => currentItems.filter(item => item.book.id !== bookId));
  }

  updateQuantity(bookId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(bookId);
      return;
    }
    this.analytics.trackEvent('cart_update_quantity', { book_id: bookId, quantity });
    this.items.update(currentItems => 
      currentItems.map(item => 
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  }

  clearCart() {
    this.analytics.trackEvent('cart_clear');
    this.items.set([]);
  }
}
