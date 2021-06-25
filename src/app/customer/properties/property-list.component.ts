import { Component, OnInit } from '@angular/core';
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
  constructor(private propertyService: PropertyService, private router: Router) { }

  properties$ = this.propertyService.properties$?.pipe(
    tap(props => console.log(props))
  );
  posts$ = this.propertyService.posts$;
  propTypes$ = this.propertyService.propTypes$;

  ngOnInit(): void {
  }

  addProperty() {
    this.router.navigate(['./customers/add-property']);
  }
  selectPost(post: string) {
    this.propertyService.postSubject.next(post.trim());
  }
  selectType(type: number) {        
    if (!isNaN(type))
      this.propertyService.propTypeSubject.next(type);
  }

}
