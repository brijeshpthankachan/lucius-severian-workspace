import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import { AnalyticsService } from '../../services/analytics.service';
import { Book } from '../../models/book';
import { CurrencyPipe, AsyncPipe } from '@angular/common';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  imports: [RouterLink, CurrencyPipe, AsyncPipe],
  templateUrl: './book-detail.html',
})
export class BookDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  private cartService = inject(CartService);
  private analytics = inject(AnalyticsService);

  book$!: Observable<Book | undefined>;

  ngOnInit() {
    this.book$ = this.route.paramMap.pipe(
      switchMap(params => this.bookService.getBookById(params.get('id') || '')),
      tap(book => {
        if (book) {
          this.analytics.trackEvent('book_view', { 
            book_id: book.id, 
            book_title: book.title,
            category: book.category
          });
        }
      })
    );
  }

  addToCart(book: Book) {
    this.cartService.addToCart(book);
  }
}
