import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AnalyticsService } from '../../services/analytics.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.html',
})
export class CartComponent {
  cartService = inject(CartService);
  private analytics = inject(AnalyticsService);
  
  isCheckingOut = signal(false);
  orderPlaced = signal(false);

  checkout() {
    const total = this.cartService.totalPrice();
    const count = this.cartService.totalItems();
    
    this.analytics.trackEvent('checkout_start', { 
      total_price: total, 
      item_count: count 
    });
    
    this.isCheckingOut.set(true);
    // Simulate API call
    setTimeout(() => {
      this.analytics.trackEvent('purchase', { 
        total_price: total, 
        item_count: count 
      });
      this.cartService.clearCart();
      this.isCheckingOut.set(false);
      this.orderPlaced.set(true);
    }, 2000);
  }
}
