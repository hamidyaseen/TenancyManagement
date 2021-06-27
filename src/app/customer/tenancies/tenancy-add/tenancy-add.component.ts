import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonsService } from '../../persons/persons.service';
import { TenancyService } from '../tenancy.service';
import { Location as AngLocation } from '@angular/common';
import { PropertyService } from '../../properties/property.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { IProperty } from '../../../model/property';
import { IPerson } from '../../../model/person';
import { Property } from '../../../model-data/property-data';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tenancy-add',
  templateUrl: './tenancy-add.component.html',
  styleUrls: ['./tenancy-add.component.scss']
})
export class TenancyAddComponent implements OnInit, OnDestroy {

  isValid: boolean = false;
  private propertyId: number = 0;

  public tenancyForm: FormGroup = this.fb.group({
    propertyId: [this.propertyId, Validators.required],
    personId: [0, Validators.required],
    rent: [6500, [Validators.required, Validators.min(100), Validators.max(30000)]],
    currency: ['DKK'],
    elCharges: [250],
    waterCharges: [130],
    warmingCharges: [270],
    gasCharges: [0],
    startDate: [Date(), Validators.required]

  });

  properties$: Observable<IProperty[]>;
  constructor(private fb: FormBuilder, private tenancyService: TenancyService, private personService: PersonsService,
    public location: AngLocation, private propertyService: PropertyService, private route: ActivatedRoute) {
    this.properties$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.propertyId = parseInt(params.get('id')!, 10) | 0;
        return this.tenancyService.propsToLease$!.pipe(
          map(properties => properties.filter(prop => (this.propertyId > 0) ? prop.id === this.propertyId : true))
        );
      })
    );
  }
   
  persons$ = this.personService.persons$?.pipe(
    map(persons => persons.filter(person => (person.leaseId === 0))
    )
  );

  private property: IProperty = {} as IProperty;
  private propertySub: Subscription | undefined;
  private person: IPerson = {} as IPerson;
  private personSub: Subscription | undefined;

  ngOnInit(): void {
    this.propertySub = this.tenancyForm?.controls['propertyId'].valueChanges.subscribe(te => this.property = te);
    this.personSub = this.tenancyForm?.controls['personId'].valueChanges.subscribe(per => this.person = per);
  }

  ngOnDestroy(): void {
    this.propertySub ? this.propertySub.unsubscribe() : '';
    this.personSub ? this.personSub.unsubscribe() : '';
  }

  onSubmit(): void {
    const tenancy = { ...this.tenancyForm?.value, propertyId: this.property.id, personId: this.person.id }
    this.tenancyService.addTenancy(tenancy).
      pipe(tap(t => console.log(t.id)))
      .subscribe(lease => {
        if (lease && lease.id > 0) {
          this.propertyService.updateLeasedProperty({ ...this.property, leaseId: lease.id })
            .subscribe(pr =>
              this.personService.updateLeasingPerson({ ...this.person, leaseId: lease.id })
                .subscribe(p => this.location.back(), err => console.log(err))
              , err => console.log(err));
        }
      }, err => console.log(err));
  } 
}
