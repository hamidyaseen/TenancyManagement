import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../../login-auth/auth.service';
import { IPostNumber } from '../../model/postnumber';
import { IProperty } from '../../model/property';
import { IPropertyType } from '../../model/property-type';
import { IUser } from '../../model/user';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseUrl: string = '/api';
  private httpOption = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
  };

  private propertiesA$: Observable<IProperty[]> | undefined;
  private propertySubject = new BehaviorSubject<number>(0);
  propertySelection$ = this.propertySubject.asObservable();

  property$: Observable<IProperty> | undefined;
  propertiesWithTypes$: Observable<IProperty[]> | undefined;
  properties$: Observable<IProperty[]> | undefined;

  posts$: Observable<IPostNumber[]> | undefined;
  postSubject = new BehaviorSubject<string>('0');
  postSelection$ = this.postSubject.asObservable();

  propTypeSubject = new BehaviorSubject<number>(0);
  propTypeSelection$ = this.propTypeSubject.asObservable();

  activeUser: IUser | undefined;
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  propTypes$ = this.http.get<IPropertyType[]>(this.baseUrl + '/propertypes')
    .pipe(
      tap(pTypes => console.log(pTypes?.length)),
      catchError(ErrorHandlerService.handle<IPropertyType[]>('Get property types', []))
    );

  // I need to keep subscription as long as app running
  // as the service remain runing, so it user is valid until...
  private userSub = this.authService.observeUser$.subscribe(user => {
    // As no user logged in, no properties whould be there.
    if (user?.token) {
      this.activeUser = user;
      this.propertiesA$ = this.http.get<IProperty[]>(`${this.baseUrl}/properties?usertoken=${user.token}`)
        .pipe(
          tap(props => {
            console.log(props);
            /*this.posts$ = of(props.map(prop => prop.postnr));*/
          }),
          catchError(ErrorHandlerService.handle<IProperty[]>('Get Properties', []))
        );
      this.posts$ = this.http.get<IProperty[]>(`${this.baseUrl}/properties?usertoken=${user.token}`)
        .pipe(
          map(props => props.map(prop => ({ id: prop.id, postNumber: prop.postnr })))
        );

      this.property$ = combineLatest([this.propertiesA$, this.propertySelection$])
        .pipe(
          map(([props, selectionId]) => {
            const retProperty = props.find(prop => prop.id === selectionId);
            return retProperty ? retProperty : {} as IProperty;
          })
        );

      this.propertiesWithTypes$ = combineLatest([this.propertiesA$, this.propTypes$])
        .pipe(
          map(([properties, types]) => {
            return properties.map(property => ({
              ...property,
              type: (types?.length) ? types.find(t => t.id === property.typeId)?.name : ''
            })
            );
          })
        );
      this.properties$ = combineLatest([this.propertiesWithTypes$, this.postSelection$, this.propTypeSelection$])
        .pipe(
          map(([props, post, type]) => props.filter(prop => {

            if (post?.length > 0 && post != '0') {
              if (type > 0)
                return (prop.postnr === post && prop.typeId === type);
              else
                return (prop.postnr === post);
            }
            else {
              if (type > 0)
                return (prop.typeId === type)
            }

            return true;
          }))
        );

    }// as a valid user
  });


//error => {
//          console.log(error);
//          return of({} as IProperty);
//        }
  addProperty(property: IProperty): Observable<boolean> {
    return this.http.post<IProperty>(this.baseUrl + '/properties',
      { ...property, usertoken: this.activeUser?.token },
      this.httpOption)
      .pipe(
        tap(prop => console.log(prop)),
        catchError(ErrorHandlerService.handle<IProperty>('Add property service', {} as IProperty)),
        map((p: IProperty) => (p?.id && isNaN(p.id) === false && p.id > 0) ? true : false)
      );
  }

  updateLeasedProperty(property: IProperty): Observable<boolean> {
    return this.http.put<IProperty>(`${this.baseUrl}/properties`, property, this.httpOption)
      .pipe(
        map(p => (p?.id && isNaN(p.id) === false && p.id > 0 && p.leaseId === property.leaseId) ? true : false),
        catchError(ErrorHandlerService.handle<boolean>('Updating leased property'))
      );
  }
  selectProperty(propertyId: number): void {
    this.propertySubject.next(propertyId);
  }
}
