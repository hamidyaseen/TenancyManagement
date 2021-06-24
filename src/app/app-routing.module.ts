import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './top/home/home.component';
import { AboutComponent } from './top/about/about.component';
import { PrivacyComponent } from './top/privacy/privacy.component';
import { LoginModule } from './login/login.module';
import { DesktopComponent } from './top/desktop/desktop.component';
import { CommonModule } from '@angular/common';
import { PathNotFoundComponent } from './top/path-not-found/path-not-found.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { AuthGuard } from './login-auth/auth-guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'customer',
    canLoad: [AuthGuard],
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    
  },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'desktop', component: DesktopComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PathNotFoundComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PrivacyComponent,    
    DesktopComponent,
    PathNotFoundComponent
  ],
  imports: [
    // As I am linking top component to app routing
    CommonModule,
    RouterModule.forRoot(routes),
    LoginModule,
    AppMaterialModule        
  ],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
