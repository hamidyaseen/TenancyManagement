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
  constructor(private personsService: PersonsService) { }

  persons$ = this.personsService.persons$?.
    pipe(
    tap(pers => console.log(pers?.length))
  );
  incomeRanges$ = this.personsService.incomeRanges$
    .pipe(
      tap(ranges => console.log(ranges?.length))
    );

  ngOnInit(): void {
  }
  selectIncomeRange(id: number) {
    console.log(id);
    this.personsService.selectPersonByRangeId(id);
  }
}
