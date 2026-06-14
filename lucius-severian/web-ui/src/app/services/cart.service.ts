import { Injectable, signal, computed } from '@angular/core';
import { Book, CartItem } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = signal<CartItem[]>([]);

  readonly cartItems = computed(() => this.items());
  readonly totalItems = computed(() => this.items().reduce((acc, item) => acc + item.quantity, 0));
  readonly totalPrice = computed(() => this.items().reduce((acc, item) => acc + (item.book.price * item.quantity), 0));

  addToCart(book: Book) {
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
    this.items.update(currentItems => currentItems.filter(item => item.book.id !== bookId));
  }

  updateQuantity(bookId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(bookId);
      return;
    }
    this.items.update(currentItems => 
      currentItems.map(item => 
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  }

  clearCart() {
    this.items.set([]);
  }
}
