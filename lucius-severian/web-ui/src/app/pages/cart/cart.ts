import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.html',
})
export class CartComponent {
  cartService = inject(CartService);
  isCheckingOut = signal(false);
  orderPlaced = signal(false);

  checkout() {
    this.isCheckingOut.set(true);
    // Simulate API call
    setTimeout(() => {
      this.cartService.clearCart();
      this.isCheckingOut.set(false);
      this.orderPlaced.set(true);
    }, 2000);
  }
}
