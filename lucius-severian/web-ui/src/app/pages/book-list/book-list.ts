import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { BookCardComponent } from '../../components/book-card/book-card';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-list',
  imports: [BookCardComponent, AsyncPipe],
  templateUrl: './book-list.html',
})
export class BookListComponent implements OnInit {
  bookService = inject(BookService);
  books$!: Observable<Book[]>;

  ngOnInit() {
    this.books$ = this.bookService.getBooks();
  }
}
