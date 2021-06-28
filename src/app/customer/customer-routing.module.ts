import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { PropertyListComponent } from './properties/property-list.component';
import { PersonListComponent } from './persons/person-list.component';
import { TenacyListComponent } from './tenancies/tenacy-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../login-auth/auth-guard';
import { PersonAddComponent } from './persons/person-add/person-add.component';
import { PropertyAddComponent } from './properties/property-add/property-add.component';
import { TenancyAddComponent } from './tenancies/tenancy-add/tenancy-add.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'properties', component: PropertyListComponent },
          { path: 'properties/add', component: PropertyAddComponent },
          { path: 'tenancies', component: TenacyListComponent },
          { path: 'tenancies/add/:id', component: TenancyAddComponent },
          { path: 'tenancies/add', component: TenancyAddComponent },
          { path: 'persons', component: PersonListComponent },
          { path: 'persons/add', component: PersonAddComponent },
          { path: 'profile', component: ProfileComponent },
          { path: '', redirectTo: 'tenancies', pathMatch: 'full' }
        ]
      }      
    ]
  },
  
];

@NgModule({
  declarations: [
    CustomerComponent,
    PropertyListComponent,
    PersonListComponent,
    TenacyListComponent,
    DashboardComponent,
    PersonAddComponent,
    PropertyAddComponent,
    TenancyAddComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]  
})
export class CustomerRoutingModule { }
