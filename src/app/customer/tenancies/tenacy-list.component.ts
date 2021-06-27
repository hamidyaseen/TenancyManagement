import { Component, OnInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { ILease } from '../../model/lease';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { TenancyService } from './tenancy.service';

@Component({
  selector: 'app-tenacy-list',
  templateUrl: './tenacy-list.component.html',
  styleUrls: ['./tenacy-list.component.scss']
})
export class TenacyListComponent implements OnInit {

  secondRow: boolean = false;
  constructor(private tenancyService: TenancyService) { }
  tenancies$ = this.tenancyService.tenanciesPropertyPerson$?.
    pipe(
      map(tenancies => tenancies.map(tenancy => ({ ...tenancy, costMonthly: (tenancy.rent + tenancy.elCharges + tenancy.gasCharges + tenancy.warmingCharges + tenancy.waterCharges) }))),
      catchError(ErrorHandlerService.handle<ILease[]>('Fetch leases', []))
    );

  ngOnInit(): void {
  }

}
