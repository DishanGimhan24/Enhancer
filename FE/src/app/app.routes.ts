import { Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookEditComponent } from './book/book-edit/book-edit.component';

export const routes: Routes = [
    { path: '', component: BookComponent },
    { path: 'books', component: BookListComponent },
    { path: 'edit/:id', component: BookEditComponent },
];
