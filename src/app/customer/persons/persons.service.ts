import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, range } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { AuthService } from '../../login-auth/auth.service';
import { Person } from '../../model-data/person-data';
import { IIncomeRange } from '../../model/incomeRange';
import { IPerson } from '../../model/person';
import { IUser } from '../../model/user';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private baseUrl: string = '/api';
  private httpOption = { headers: new HttpHeaders({ 'content-type': 'application/json' }) };

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  private personsIn$: Observable<IPerson[]> | undefined;
  persons$: Observable<IPerson[]> | undefined;

  selectedPerson$: Observable<IPerson> | undefined;
  private personSubject = new BehaviorSubject<number>(0);
  personSelection$ = this.personSubject.asObservable();

  activeUser: IUser | undefined;
  // share by all users.
  private rangeSubject = new BehaviorSubject<number>(0);
  rangeSelection$ = this.rangeSubject.asObservable();
  incomeRanges$: Observable<IIncomeRange[]> = this.http.get<IIncomeRange[]>(`${this.baseUrl}/incomeRanges`)
    .pipe(
      tap(ranges => {
        console.log(ranges);
      }),
      catchError(ErrorHandlerService.handle<IIncomeRange[]>('Featch Imcome Ranges',[]))
  );
  
  userSub = this.authService.observeUser$.subscribe(nextUser => {
    if (nextUser?.token) {
      this.activeUser = nextUser;
      // private to user
      this.personsIn$ = this.http.get<IPerson[]>(`${this.baseUrl}/persons?usertoken=${this.activeUser.token}`)
        .pipe(
          tap(persons => console.log(persons?.length)),
          catchError(ErrorHandlerService.handle<IPerson[]>('Featch Persons', []))
      );

      this.persons$ = combineLatest([this.personsIn$, this.incomeRanges$, this.rangeSelection$])
        .pipe(
          map(([persons, incomes, rangeSelection]) => {
            const pers = persons.filter(person => (rangeSelection > 0) ? person.incomeRangeId === rangeSelection : true);
            return pers.map(person => ({
              ...person,
              incomeRange: incomes.find(income => income.id === person.incomeRangeId)?.range
            } as IPerson)
            );
          })
        );      


      this.selectedPerson$ = combineLatest([this.personsIn$, this.personSelection$]).pipe(
        map(([persons, personId]) => persons.find(person => person.id === personId)),
        map(person => person ? person : {} as IPerson)
      );
    }
  });

  addPerson(person: IPerson): Observable<boolean> {
    const aPerson = { ...person, usertoken: this.activeUser?.token, leaseId: 0 } as IPerson;
    return this.http.post<IPerson>(`${this.baseUrl}/persons`, aPerson, this.httpOption)
      .pipe(
        tap(per => console.log(per.id)),
        map(per => (per.id > 0))
      );
  }
  updateLeasingPerson(person: IPerson): Observable<boolean> {
    return this.http.put<IPerson>(`${this.baseUrl}/persons`, { ...person, usertoken: this.activeUser?.token }, this.httpOption)
      .pipe(
        map(per => (per?.id && isNaN(per.id) === false && per.id > 0 && per.leaseId === person.leaseId) ? true : false),
        catchError(ErrorHandlerService.handle<boolean>('Update Leasing Person information'))
      );
  }
  selectPersonById(personId: number): void {
    this.personSubject.next(personId);
  }
  selectPersonByRangeId(rangeId: number): void {
    this.rangeSubject.next(rangeId);
  }
}
