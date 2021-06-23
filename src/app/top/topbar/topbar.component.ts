import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../login-auth/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  public isExpanded: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }
  logMeOut(): void {
    this.authService.logout().subscribe(x => this.router.navigate(['/home']));
  }
}
