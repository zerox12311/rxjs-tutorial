import { Author } from './../models/author.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  server = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.server + 'authors');
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(this.server + `author/${id}`);
  }
}
