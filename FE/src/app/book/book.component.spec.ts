import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookComponent } from './book.component';
import { BookService } from './book.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let mockBookService: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    mockBookService = jasmine.createSpyObj('BookService', ['getBooks', 'createBook', 'updateBook', 'deleteBook']);
    mockBookService.getBooks.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, HttpClientTestingModule],
      declarations: [BookComponent],
      providers: [{ provide: BookService, useValue: mockBookService }]
    }).compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
