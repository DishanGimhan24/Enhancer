import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BookService } from './book.service';

import { Book } from './book.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'], // Ensure the file exists
})

export class BookComponent implements OnInit {
  books: Book[] = [];
  bookForm: FormGroup;
  editMode = false;
  selectedBook: Book | null = null;

  constructor(private bookService: BookService) {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      publishedYear: new FormControl('', [Validators.required]),
      author: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  addBook() {
    if (this.bookForm.valid) {
      this.bookService.createBook(this.bookForm.value).subscribe(
        (book: Book) => {
          this.books.push(book);
          this.bookForm.reset();
        },
        (error) => {
          alert('Failed to add book.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }

  editBook(book: Book) {
    this.selectedBook = { ...book };
    this.editMode = true;
    this.bookForm.setValue({
      title: book.title,
      description: book.description,
      publishedYear: book.publishedYear,
      author: book.author
    });
  }

  updateBook() {
    if (this.selectedBook && this.bookForm.valid) {
      const updatedBook: Book = {
        ...this.selectedBook,
        ...this.bookForm.value
      };
      this.bookService.updateBook(updatedBook.id, updatedBook).subscribe(
        () => {
          const idx = this.books.findIndex(b => b.id === updatedBook.id);
          if (idx > -1) this.books[idx] = updatedBook;
          this.cancelEdit();
        },
        (error) => {
          alert('Failed to update book.');
        }
      );
    }
  }

  deleteBook(book: Book) {
    if (confirm('Delete this book?')) {
      this.bookService.deleteBook(book.id).subscribe(
        () => {
          this.books = this.books.filter(b => b.id !== book.id);
          if (this.selectedBook?.id === book.id) this.cancelEdit();
        },
        (error) => {
          alert('Failed to delete book.');
        }
      );
    }
  }

  cancelEdit() {
    this.selectedBook = null;
    this.editMode = false;
    this.bookForm.reset();
  }
}
