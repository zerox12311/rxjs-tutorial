import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  server = 'http://localhost:3000/';
  constructor(
    private http: HttpClient
  ) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.server + 'books');
  }

  getBookSlow(): Observable<Book[]> {
    return this.http.get<Book[]>(this.server + 'books-slow');
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(this.server + `book/${id}`);
  }


}
