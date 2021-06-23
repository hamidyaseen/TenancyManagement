import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './top/home/home.component';
import { AboutComponent } from './top/about/about.component';
import { PrivacyComponent } from './top/privacy/privacy.component';
import { LoginModule } from './login/login.module';
import { DesktopComponent } from './top/desktop/desktop.component';
import { CommonModule } from '@angular/common';
import { PathNotFoundComponent } from './top/path-not-found/path-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PathNotFoundComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PrivacyComponent,    
    DesktopComponent, PathNotFoundComponent
  ],
  imports: [
    // As I am linking top component to app routing
    CommonModule,
    RouterModule.forRoot(routes), LoginModule],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
