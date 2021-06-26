import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { PropertyService } from './property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {

  secondRow: boolean = false;
  constructor(private fb: FormBuilder, private propertyService: PropertyService, private router: Router) { }

  selectionForm = this.fb.group({
    postNumber: ['0'],
    propertyType: [0]
  });

  properties$ = this.propertyService.properties$?.pipe(
    tap(props => console.log(props?.length))
  );
  posts$ = this.propertyService.posts$;
  propTypes$ = this.propertyService.propTypes$;

  ngOnInit(): void {
    this.selectionForm.valueChanges.subscribe(
      nextVal => {
        this.propertyService.postSubject.next(nextVal.postNumber.trim());
        this.propertyService.propTypeSubject.next(nextVal.propertyType);
      }
    )
  }
  hasFiltered(): boolean {
    return (this.selectionForm.controls['postNumber'].value === '0' && this.selectionForm.controls['propertyType'].value === 0)
  }
}
