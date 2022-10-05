import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Game from '../../../../common/src/models/game';
import ApiResult from '../../../../common/src/models/apiResult';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  public gamesCache: Array<Game>
  baseurl = 'http://localhost:4000/games/';
  constructor(private http: HttpClient) { }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // POST
  Create(data): Observable<ApiResult> {
    return this.http
      .post<ApiResult>(
        this.baseurl,
        JSON.stringify(data),
        this.httpOptions
      ).pipe(retry(3), catchError(this.errorHandl));
  }
  // GET
  GetItem(id): Observable<Game> {
    return this.http
      .get<Game>(this.baseurl  + id)
      .pipe(retry(3), catchError(this.errorHandl));
  }
  // GET
  GetItems(): Observable<Array<Game>> {
    return this.http
      .get<Array<Game>>(this.baseurl)
      .pipe(retry(3), tap(games => this.gamesCache = games), catchError(this.errorHandl));
  }
  // PUT
  Update(id, data): Observable<Game> {
    return this.http
      .put<Game>(
        this.baseurl  + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(3), catchError(this.errorHandl));
  }
  // DELETE
  Delete(id) {
    return this.http
      .delete<Game>(this.baseurl  + id, this.httpOptions)
      .pipe(retry(3), catchError(this.errorHandl));
  }
  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
