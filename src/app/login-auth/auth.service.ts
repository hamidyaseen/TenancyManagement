import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IUser } from '../model/user';
import { LoginImpService } from './login-imp.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  isLoggedIn: boolean = false;
  
  private re_direct_url: string = '';
  set redirectUrl(url: string) { this.re_direct_url = url; }
  get redirectUrl(): string { return this.re_direct_url; }

  private loginSubject = new BehaviorSubject(false);
  observeLogin$ = this.loginSubject.asObservable();

  //private userSubject = new BehaviorSubject({} as IUser);
  //observeUser$ = this.userSubject.asObservable();

  constructor(private loginImp: LoginImpService) { }

  login(userName: string, pass: string): Observable<boolean> {
    return this.loginImp.validateUser(userName.trim(), pass.trim())
      .pipe(
        catchError(error => throwError(error)),       
        map(user => {
          this.isLoggedIn = (user?.token?.length === 36);
     /*     this.userSubject.next(user);*/
          this.loginSubject.next(this.isLoggedIn);
          return this.isLoggedIn;
        })
      );
  }

  logout(): Observable<boolean> {
    return this.loginImp.invalidateUser().pipe(
      tap(x => {
        if (x) {
          //   this.user = undefined;
      /*    this.userSubject.next({} as IUser);*/
          this.isLoggedIn = false;
          this.loginSubject.next(this.isLoggedIn);
        }
      })
    );
  }

  Register(aUser: IUser): Observable<boolean> {
    return this.loginImp.addNewUser(aUser)
      .pipe(        
        map((u: IUser) => (u?.id && isNaN(u.id) === false && u?.token && u.token.length === 36) ? true : false)
      );
  }
}
