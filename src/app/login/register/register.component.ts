import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../login-auth/alert.service';
import { AuthService } from '../../login-auth/auth.service';
import { IUser } from '../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;

  constructor(private formBuilder: FormBuilder,   private authService: AuthService,
    private router: Router,   private alert: AlertService) {
  }

  registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void { }
  ngOnDestroy(): void { }

  onSubmit(): void {    
    if (this.authService.isLoggedIn)
      this.authService.logout().subscribe(next => this.tryToRegister());
    else
      this.tryToRegister();
  }

  private tryToRegister() {
  
    let registerSub = this.authService.Register(this.registerForm.value as IUser).subscribe(ret => {
      if (ret) {
        this.alert.success('Registration successful', true);
        this.router.navigate(['/login']);
      }
      registerSub ? registerSub.unsubscribe() : '';
    }, err => { console.log("Failed to register "); registerSub ? registerSub.unsubscribe() : ''; });
  }
}
