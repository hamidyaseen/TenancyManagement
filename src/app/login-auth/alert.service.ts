import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';

export interface IAlert {
  type: string;
  text: string,
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject = new Subject<IAlert | undefined>();
  public alertState$ = this.alertSubject.asObservable();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart)
        this.keepAfterRouteChange ? this.keepAfterRouteChange = false : this.clear();
    });
  }

  clear(): void { this.alertSubject.next(); }
  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertSubject.next({ type: 'success', text: message });
  }
  error(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertSubject.next({ type: 'error', text: message });
  }
}
