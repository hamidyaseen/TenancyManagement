import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PropertyService } from './property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit, OnDestroy {

  secondRow: boolean = false;
  constructor(private fb: FormBuilder, private propertyService: PropertyService, private router: Router) { }
  
  selectionForm = this.fb.group({  postNumber: ['0'],  propertyType: [0] });

  properties$ = this.propertyService.properties$?.pipe(
    tap(props => console.log(props?.length))
  );
  posts$ = this.propertyService.posts$;
  propTypes$ = this.propertyService.propTypes$;

  private postNumberSub: Subscription | undefined;
  private propTypeSub: Subscription | undefined;
  ngOnInit(): void {
    this.postNumberSub = this.selectionForm.controls['postNumber'].valueChanges.subscribe(postNo =>
      this.propertyService.postSubject.next(postNo.trim()));
    this.propTypeSub = this.selectionForm.controls['propertyType'].valueChanges.subscribe(pType =>
      this.propertyService.propTypeSubject.next(pType));
      // remove filter from serivce, 
    this.propertyService.postSubject.next('0');
    this.propertyService.propTypeSubject.next(0);
  }
  ngOnDestroy(): void {
    this.propertyService.postSubject.next('0');
    this.propertyService.propTypeSubject.next(0);
    this.postNumberSub ? this.postNumberSub.unsubscribe() : '';
    this.propTypeSub ? this.propTypeSub.unsubscribe() : '';
  }

  hasFiltered(): boolean {
    return (this.selectionForm.controls['postNumber'].value === '0' && this.selectionForm.controls['propertyType'].value === 0)
  }
}
