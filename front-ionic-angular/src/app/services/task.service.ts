import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Task from '../../../../common/src/models/task';
import ApiResult from '../../../../common/src/models/apiResult';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public tasksCache: Array<Task>
  baseurl = 'http://localhost:4000/Tasks/';
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
  GetItem(id): Observable<Task> {
    return this.http
      .get<Task>(this.baseurl  + id)
      .pipe(retry(3), catchError(this.errorHandl));
  }
  // GET
  GetItems(): Observable<Array<Task>> {
    return this.http
      .get<Array<Task>>(this.baseurl)
      .pipe(retry(3), tap(tasks => this.tasksCache = tasks), catchError(this.errorHandl));
  }
  // PUT
  Update(id, data): Observable<Task> {
    return this.http
      .put<Task>(
        this.baseurl  + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(3), catchError(this.errorHandl));
  }
  // DELETE
  Delete(id) {
    return this.http
      .delete<Task>(this.baseurl  + id, this.httpOptions)
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
