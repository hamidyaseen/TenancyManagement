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
export class LoginComponent implements OnInit {
    
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
    if (this.authService.isLoggedIn)
      this.router.navigate([this.authService.redirectUrl]); // '/customers']);
  }

  onSubmit(): void {
    const userName = (this.loginForm.value.username as string).trim();
    const userPass = (this.loginForm.value.password as string).trim();  

    if (userName && userName.length > 0 && userPass && userPass.length > 0) {     
      // sub to http post observer
      let loginSub = this.authService.login(userName, userPass).
        subscribe(result => {
          loginSub ? loginSub.unsubscribe() : '';
          result ?
            this.router.navigate([this.authService.redirectUrl]):  this.alert.error('Login failed');
        });
    }
  }
}
