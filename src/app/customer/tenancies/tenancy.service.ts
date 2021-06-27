import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../../login-auth/auth.service';
import { ILease } from '../../model/lease';
import { IProperty } from '../../model/property';
import { IUser } from '../../model/user';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { PersonsService } from '../persons/persons.service';
import { PropertyService } from '../properties/property.service';

@Injectable({
  providedIn: 'root'
})
export class TenancyService {

  private baseUrl: string = '/api';
  private activeUser: IUser | undefined;

  private tenanciesI$: Observable<ILease[]> | undefined;
  public tenanciesPropertyPerson$: Observable<ILease[]> | undefined;
  public propsToLease$: Observable<IProperty[]> | undefined;

  constructor(private http: HttpClient, private authService: AuthService,
    private propertyService: PropertyService, private personService: PersonsService) {
  }

  private leaseSub = this.authService.observeUser$.subscribe(user => {
    if (user?.token) {
      this.activeUser = user;

      this.tenanciesI$ = this.http.get<ILease[]>(`${this.baseUrl}/tenancies?usertoken=${this.activeUser.token}`)
        .pipe(
          tap(tes => {
            console.log(tes.length + ' Tenancies');
          }),
          catchError(ErrorHandlerService.handle<ILease[]>('Featch tenancies', []))
        );

      this.tenanciesPropertyPerson$ = combineLatest([this.tenanciesI$, this.propertyService.propertiesWithTypes$!, this.personService.persons$!])
        .pipe(
          map(([tenancies, properties, persons]) =>
            tenancies.map(tenancy => ({
              ...tenancy,
              property: properties.find(prop => prop.id === tenancy.propertyId)!,
              person: persons.find(person => person.id === tenancy.personId)!
            }))
          )
        );

      this.propsToLease$ = this.propertyService.properties$?.pipe(
        map((props: IProperty[]) => props.filter(prop => (prop.leaseId === 0)))
      );
    }
  });

  public addTenancy(lease: ILease): Observable<ILease> {
    return this.http.post<ILease>(`${this.baseUrl}/tenancies`,
      {
        ...lease,
        usertoken: this.activeUser?.token,
        extraGas: (lease.gasCharges > 0),
        extraEl: (lease.elCharges > 0),
        extraWater: (lease.waterCharges > 0),
        extraWarmin: (lease.warmingCharges > 0)
      }, { headers: new HttpHeaders({ 'content-type': 'application/json' }) })
      .pipe(
        tap(l => console.log(l))
      )
  }
}
