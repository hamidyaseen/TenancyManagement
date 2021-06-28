import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location as AngLocation } from '@angular/common';
import { catchError, map, tap } from 'rxjs/operators';
import { ILease } from '../../model/lease';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { TenancyService } from './tenancy.service';
import { PropertyService } from '../properties/property.service';
import { PersonsService } from '../persons/persons.service';

@Component({
  selector: 'app-tenacy-list',
  templateUrl: './tenacy-list.component.html',
  styleUrls: ['./tenacy-list.component.scss']
})
export class TenacyListComponent implements OnInit {

  secondRow: boolean = false;
  constructor(private tenancyService: TenancyService, private location: AngLocation,
    private propertyService: PropertyService, private personService: PersonsService) {
  }

  tenancies$ = this.tenancyService.tenanciesPropertyPerson$?.
    pipe(
      map(tenancies => tenancies.map(tenancy => ({ ...tenancy, costMonthly: (tenancy.rent + tenancy.elCharges + tenancy.gasCharges + tenancy.warmingCharges + tenancy.waterCharges) }))),
      catchError(ErrorHandlerService.handle<ILease[]>('Fetch leases', []))
    );

  ngOnInit(): void {
  }

  endTenancy(tenancy: ILease): void {
    
    this.tenancyService.deleteTenancy(tenancy.id).subscribe(next => {
      this.propertyService.updateLeasedProperty({ ...tenancy?.property!, leaseId: 0 })
        .subscribe(pr =>
          this.personService.updateLeasingPerson({ ...tenancy?.person!, leaseId: 0 })
            .subscribe(p => this.location.back(),
              err => console.log(err))
          , err => console.log(err));
    });
  }
}
