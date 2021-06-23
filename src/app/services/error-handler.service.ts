import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IErrorHandle<T> {
  (error: ErrorEvent): Observable<T>
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor() { }

  public static handle<T>(operation = 'Operation', result?: T): IErrorHandle<T> {
    return (err: ErrorEventInit): Observable<T> => {
      if (typeof err === 'string')
        console.log(`${operation}  failed : ${err}`);
      else if (typeof err === 'object' && err.error instanceof ErrorEvent)
        console.log(`${operation}  failed : ${err.error.message}`);
      else if (typeof err === 'object')
        console.log(`${operation}  failed : ${JSON.stringify(err)}`);
      else
        console.log(`${operation}  failed : ${err}`);

      return of(result as T);
    }
  }
}
