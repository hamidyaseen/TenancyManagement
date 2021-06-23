import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../login-auth/alert.service';
import { AuthService } from '../../login-auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  //tryLogin: boolean = false;
  //submitted: boolean = false;
  //loginSub: Subscription | undefined;
  loginSubscription: Subscription | undefined;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder,  private authService: AuthService,
    private router: Router, private alert: AlertService) {
  }

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    // temp
    // 1:- Check If I got a Input URL param otherwise a default URL save to redirecting afterward. 
    // 2:- Check from Auth service, if already a user logged in, redirect to the saved url
    //if (this.authService.isLoggedIn)
    //  this.router.navigate(['/customers']);
    this.loginSubscription = this.authService.observeLogin$.subscribe(next => {
      if (next) //(this.authService.isLoggedIn)
        this.router.navigate([this.authService.redirectUrl]);
      else {
        this.alert.error('Login failed');
        //this.submitted = false;
        //this.tryLogin = false;
      }
    }
      , err => console.log('while logging error is ' + err))
  }
  ngOnDestroy(): void {
    this.loginSubscription ? this.loginSubscription.unsubscribe() : '';
    
  }

  onSubmit(): void {
    const userName = (this.loginForm.value.username as string).trim();
    const userPass = (this.loginForm.value.password as string).trim();
   /* this.submitted = true;*/

    if (userName && userName.length > 0 && userPass && userPass.length > 0) {
     /* this.tryLogin = true;*/
      // sub to http post observer
      let loginSub = this.authService.login(userName, userPass).
        subscribe(result => {
          loginSub ? loginSub.unsubscribe() : '';
          console.log(result)
        }
        //{
        //  if (this.authService.isLoggedIn)
        //    this.router.navigate([this.authService.redirectUrl]);
        //  else {
        //    this.alert.error('Login failed');
        //    this.submitted = false;
        //    this.tryLogin = false;
        //  }
        //}
        );
    }
  }
}
