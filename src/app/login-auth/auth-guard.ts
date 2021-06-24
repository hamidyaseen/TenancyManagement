import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {

  constructor(private AuthService: AuthService, private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(childRoute);
    console.log(state);

    return this.checkLogin(state.url);
    }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route);
    console.log(state);
    return this.checkLogin(state.url);
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    console.log(route);
    return this.checkLogin(`/${route.path}`);
  }

  private checkLogin(url: string): boolean
  {
    if (this.AuthService.isLoggedIn) return true;
    this.AuthService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

}
