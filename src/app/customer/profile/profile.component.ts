import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../login-auth/auth.service';
import { IUser } from '../../model/user';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  activeUser$ = this.authService.observeUser$
    .pipe(
      catchError(ErrorHandlerService.handle<IUser>('get active user', {} as IUser))
  );

  ngOnInit(): void {
  }

}
