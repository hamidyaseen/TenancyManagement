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

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'properties', component: PropertyListComponent },
          { path: 'tenancies', component: TenacyListComponent },
          { path: 'persons', component: PersonListComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
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
    DashboardComponent
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
