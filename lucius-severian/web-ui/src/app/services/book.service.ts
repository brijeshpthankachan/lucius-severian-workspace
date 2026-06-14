import { Injectable, signal } from '@angular/core';
import { Book } from '../models/book';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books = signal<Book[]>([
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A story of wealth, love, and the American Dream in the 1920s.',
      price: 15.99,
      imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
      category: 'Classic'
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A classic novel about racial injustice and the loss of innocence.',
      price: 12.50,
      imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
      category: 'Classic'
    },
    {
      id: '3',
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian novel about a totalitarian regime and the power of surveillance.',
      price: 10.99,
      imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400',
      category: 'Dystopian'
    },
    {
      id: '4',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      description: 'An adventure in Middle-earth featuring Bilbo Baggins.',
      price: 14.99,
      imageUrl: 'https://images.unsplash.com/photo-1621351123083-b8227d3531f4?auto=format&fit=crop&q=80&w=400',
      category: 'Fantasy'
    },
    {
      id: '5',
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'An easy and proven way to build good habits and break bad ones.',
      price: 18.00,
      imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400',
      category: 'Self-Help'
    },
    {
      id: '6',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      description: 'A lone astronaut must save the earth from disaster.',
      price: 22.00,
      imageUrl: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=400',
      category: 'Sci-Fi'
    }
  ]);

  getBooks(): Observable<Book[]> {
    return of(this.books());
  }

  getBookById(id: string): Observable<Book | undefined> {
    return of(this.books().find(b => b.id === id));
  }
}
