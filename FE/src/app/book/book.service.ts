import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  publishedYear: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private API_URL = 'http://localhost:5025/api/book';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_URL);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.API_URL}/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API_URL, book);
  }

  updateBook(id: number, book: Book): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
