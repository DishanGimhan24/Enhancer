import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../book.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe({
      next: books => this.books = books,
      error: err => console.error('Error fetching books:', err)
    });
  }

  deleteBook(id: number) {
    if (confirm('Delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.id !== id);
        },
        error: err => alert('Failed to delete book.')
      });
    }
  }

  goToBookList() {
    this.router.navigate(['/books']);
  }

  editBook(id: number) {
    this.router.navigate(['/edit', id]);
  }
}
