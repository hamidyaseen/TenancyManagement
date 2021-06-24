import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IUser } from '../model/user';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LoginImpService {


  private baseUrl = '/api/users';
  private postOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  validateUser(user: string, pass: string): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl, { username: user, password: pass }, this.postOptions)
      .pipe(
        tap(result => console.log(result.firstName)),
        catchError(ErrorHandlerService.handle<IUser>('Create new user', {} as IUser))
      );
  }

  invalidateUser(): Observable<boolean> {
    return of(true)
      .pipe(
        tap(x => console.log('Logged out.'))
      );
  }
  addNewUser(aUser: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl, aUser, this.postOptions)
      .pipe(        
        tap(u => console.log(u.id)),
        catchError(ErrorHandlerService.handle<IUser>('Create new user', {} as IUser))
      );
  }
}
