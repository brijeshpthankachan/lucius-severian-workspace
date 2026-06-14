import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../models/book';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-book-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './book-card.html',
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;
  cartService = inject(CartService);

  addToCart(event: MouseEvent) {
    event.stopPropagation();
    this.cartService.addToCart(this.book);
  }
}
