import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IPerson } from '../../model/person';
import { PersonsService } from './persons.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  secondRow: boolean = false;
  constructor(private personService: PersonsService) {    
  }
  ngOnInit(): void {
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
    console.log(id);
    this.personService.selectPersonByRangeId(id);
  }
}
