import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import { Book } from '../../models/book';
import { CurrencyPipe, AsyncPipe } from '@angular/common';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  imports: [RouterLink, CurrencyPipe, AsyncPipe],
  templateUrl: './book-detail.html',
})
export class BookDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  private cartService = inject(CartService);

  book$!: Observable<Book | undefined>;

  ngOnInit() {
    this.book$ = this.route.paramMap.pipe(
      switchMap(params => this.bookService.getBookById(params.get('id') || ''))
    );
  }

  addToCart(book: Book) {
    this.cartService.addToCart(book);
  }
}
