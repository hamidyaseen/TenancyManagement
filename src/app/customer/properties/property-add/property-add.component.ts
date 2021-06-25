import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location as AngLocation } from '@angular/common';
import { Observable, of } from 'rxjs';
import { IAddressInfo, IFullAddress } from '../../../model/addressInfo';
import { AddressService } from '../../../services/address.service';
import { PropertyService } from '../property.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.scss']
})
export class PropertyAddComponent implements OnInit
{
  private inHandData: IAddressInfo[] = [];
  isValid: boolean = false;
  private selectedAddress: string | undefined;

  constructor(private fb: FormBuilder, public location: AngLocation,
    private propertyService: PropertyService, private addressService: AddressService) {
  }

  addressInfos$: Observable<IAddressInfo[]> | undefined;
  proertyTypes$ = this.propertyService.propTypes$;

  public properForm: FormGroup = this.fb.group({
    title: [''],
    typeId: [1],
    size: [62],
    rooms: [2],
    note: [''],
    address: ['']
  });

  onInputChange(event: Event) {
    this.selectedAddress = (event.target as HTMLInputElement).value;
    const type = this.inHandData?.[0].type;
    //console.log(this.selectedAddress, '-', type);       
    this.isValid = (type === 'adresse' && (this.getFullAddressData(this.selectedAddress)) ? true : false);
  }

  ngOnInit(): void {
    this.properForm.controls['address'].valueChanges.subscribe(text => this.checkAndGetAddressInfo(text));
  }

  onSubmit(): void {
    const fullAddress = this.getFullAddressData(this.selectedAddress!);
    if (fullAddress)
      this.propertyService.addProperty({
        ...this.properForm.value,
        husnr: fullAddress.husnr,
        vejnavn: fullAddress.vejnavn,
        postnr: fullAddress.postnr,
        postnrnavn: fullAddress.postnrnavn,
        supplerendebynavn: fullAddress.supplerendebynavn,
        href: fullAddress.href,
        leaseId: 0,
      })
        .subscribe(next => next ? this.location.back() : '',
          err => console.log(err)
        );
  }

  // ============ private interface ==============
  private checkAndGetAddressInfo = (text: string) => {
    const length = text?.length;
    if (length < 2) { // optimize server rountrips
      this.addressInfos$ = of([]);
      return;
    }

    // save time, avoid server roudtrips.
    if (this.addressEndsAtSpaces(text))
      return;

    // save time, avoid server roudtrips.
    if (this.searchingSingleLastAddress(text))
      return;

    // if already got adgangs address, then search only it, once
    if (this.alreadyParticularAdgangsAddress(text) && this.alreadyNotSearched(text))
      this.properForm.controls['address'].reset(text.substring(0, text.indexOf(',', 0) + 1));

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
