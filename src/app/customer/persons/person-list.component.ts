import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { PersonsService } from './persons.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, OnDestroy {

  secondRow: boolean = false;
  constructor(private personService: PersonsService, private fb: FormBuilder) { }
    
  incomeForm = this.fb.group({ incomeRange: [0] });

  hasNotFiltered(): boolean {
    return (this.incomeForm.controls['incomeRange'].value === 0)
  }
  ngOnInit(): void {
    this.personService.selectPersonByRangeId(0);
  }
  ngOnDestroy(): void {
    this.personService?.selectPersonByRangeId(0);
  }

  incomeRanges$ = this.personService.incomeRanges$
    .pipe(
      tap(ranges => console.log(ranges?.length))
  );

  persons$ = this.personService.persons$?.
    pipe(
    tap(pers => console.log(pers?.length))
  );

  
  selectIncomeRange(id: number) {    
    this.personService.selectPersonByRangeId(id);
  }
}
