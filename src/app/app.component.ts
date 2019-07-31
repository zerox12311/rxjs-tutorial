import { AuthorService } from './services/author.service';
import { Component, OnInit } from '@angular/core';
import { BookService } from './services/book.service';
import { forkJoin, from } from 'rxjs';
import { map, mergeMap, tap, switchMap, toArray, combineAll, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'class-rxjs';
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
  ) { }

  slowBooks$ = this.bookService.getBookSlow();
  authors$ = this.authorService.getAuthors();
  books$ = this.bookService.getBooks();

  ngOnInit(): void {

    // this.rxForkJoin();
    // this.rxMap();


  }

  go() {
    this.rxMergeMap();
  }


  rxMap() {
    this.books$.pipe(
      map(x => x.map(book => book.authors))
    ).subscribe(
      data => {
        console.group('map');
        console.log(data);
        console.groupEnd();
      }
    );
  }

  rxForkJoin() {
    forkJoin(this.slowBooks$, this.authors$).subscribe(
      data => {
        console.group('forkJoin');
        console.log(data);
        console.groupEnd();
      }
    );
  }

  rxMergeMap() {
    this.authorService.getAuthor(1).pipe(
      switchMap(x => {
        return from(x.books).pipe(
          mergeMap(y => this.bookService.getBook(y)),
          toArray(),
          map(y => {
            return {
              ...x,
              books: y
            };
          }),
        );
      }),
    ).subscribe(console.log);
  }
}
