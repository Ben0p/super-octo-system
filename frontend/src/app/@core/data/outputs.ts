import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const APIurl: String = 'http://10.1.1.106:5000/';

@Injectable({
  providedIn: 'root',
})
export class OutputService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console

      // TODO: better job of transforming error for user consumption
      // console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private returnFalse<T>(operation = 'operation', result?: T) {
    const status = {'online' : result};
    return of(result as T);
  }

  getOutputs(): Observable<any> {
    return this.http.get(APIurl + 'outputs').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getOutputs error')),
    );
  }


  postOutputs(output): Observable<any> {
    return this.http
      .post<any>(APIurl + 'outputs', JSON.stringify(output), httpOptions)
      .pipe(
        catchError(this.handleError<any>('setOutputs error')),
      );
  }

}
