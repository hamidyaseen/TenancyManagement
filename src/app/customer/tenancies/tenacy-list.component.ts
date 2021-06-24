import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenacy-list',
  templateUrl: './tenacy-list.component.html',
  styleUrls: ['./tenacy-list.component.scss']
})
export class TenacyListComponent implements OnInit {

  secondRow: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
