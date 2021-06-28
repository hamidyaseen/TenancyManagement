import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { IAddressInfo } from '../model/addressInfo';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseUrl = 'https://api.dataforsyningen.dk/autocomplete';  
  addressInfos$: Observable<IAddressInfo[]> = of([]);
  constructor(private http: HttpClient) { }

  getAddressInfo(name: string): Observable<IAddressInfo[]> {
    return this.http.get<IAddressInfo[]>(`${this.baseUrl}?q=${name}`)
      .pipe(
        tap(v => console.log(v.length)),
        retry(2), // retry a failed request 2 times
        catchError(ErrorHandlerService.handle<IAddressInfo[]>('search address infor', []))
    );
  }
  
}
