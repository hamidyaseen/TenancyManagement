import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddressInfo, IFullAddress } from '../../../model/addressInfo';
import { PersonsService } from '../persons.service';
import { Location as AngLocation } from '@angular/common';
import { AddressService } from '../../../services/address.service';
import { IIncomeRange } from '../../../model/incomeRange';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.scss']
})
export class PersonAddComponent implements OnInit {

  private inHandData: IAddressInfo[] = [];

  constructor(private fb: FormBuilder, private personService: PersonsService,
    public location: AngLocation, private addressService: AddressService) {
  }

  isValid: boolean = false;
  incomeRanges$: Observable<IIncomeRange[]> = this.personService.incomeRanges$;
  addressInfos$: Observable<IAddressInfo[]> = of([]);


  personForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    incomeRangeId: [],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required]
  });

  ngOnInit(): void {
    this.personForm.controls['address'].valueChanges.subscribe(text => this.checkAndGetAddessInfo(text));
  }
  onInputChange(event: Event) {
    let selectedAddress = (event.target as HTMLInputElement).value;
    let dataType = this.inHandData?.[0]?.type;

    console.log(selectedAddress, '-', dataType);

    this.isValid = (dataType === 'adresse' && (this.getFullAddressData(selectedAddress)) ? true : false);
    console.log(this.isValid);
  }

  onSubmit(): void {
    this.personService.addPerson(this.personForm.value)
      .pipe()
      .subscribe(next => next ? this.location.back() : '', error => console.log(error));
  }

  // ============ private interface ==============
  private checkAndGetAddessInfo = (text: string) => {
    if (text?.length < 2) { // optimize server rountrips
      this.addressInfos$ = of([]);
      return
    }

    // save time, avoid server roudtrips.
    if (this.addressEndsAtSpaces(text))
      return;

    // save time, avoid server roudtrips. for single last search
    if (this.searchingSingleLastAddress(text))
      return;

    // if already got adgangs address, then search only it, once
    if (this.alreadyParticularAdgangsAddress(text) && this.alreadyNotSearched(text))
      this.personForm.controls['address'].reset(text.substring(0, text.indexOf(',', 0) + 1));

    this.addressInfos$ = this.addressService.getAddressInfo(text).pipe(
      tap(s => {
        if (s?.length > 0) 
          this.inHandData = s;
        else
          console.log('Sorry! got no address');
      })
    ); 
  }

  private addressEndsAtSpaces(txt: string): boolean {
    return (txt?.length > 2) ? (txt[txt.length - 1].toString().trim() === "" && txt[txt.length - 2].toString().trim() === "") : false;
  }
  private searchingSingleLastAddress(txt: string): boolean {
    return (this.inHandData?.[0]?.type === 'adresse' && this.inHandData.length === 1 && txt === this.inHandData[0].tekst)
  }

  private alreadyParticularAdgangsAddress(txt: string): boolean {
    return (this.inHandData?.[0]?.type === 'adgangsadresse' && txt.indexOf(',', 0) > 0)
  }

  private alreadyNotSearched(txt: string): boolean {
    return (txt !== txt.substring(0, txt.indexOf(',', 0) + 1))
  }
  private getFullAddressData(address: string): IFullAddress | undefined {
    const fullAddress = this.inHandData.find(data => data.tekst === address);
    return fullAddress?.data;
  }

}
