import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService, Book } from '../book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      publishedYear: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.bookId = +id;
        this.bookService.getBookById(this.bookId).subscribe({
          next: (book) => {
            this.bookForm.setValue({
              title: book.title,
              author: book.author,
              description: book.description,
              publishedYear: book.publishedYear
            });
            this.loading = false;
          },
          error: () => {
            alert('Book not found.');
            this.router.navigate(['/books']);
          }
        });
      } else {
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.bookForm.valid && this.bookId !== null) {
      const updatedBook: Book = {
        id: this.bookId,
        ...this.bookForm.value
      };
      this.bookService.updateBook(this.bookId, updatedBook).subscribe({
        next: () => {
          alert('Book updated successfully!');
          this.router.navigate(['/books']);
        },
        error: () => alert('Failed to update book.')
      });
    }
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}
