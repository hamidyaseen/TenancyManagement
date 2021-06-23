import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  public isExpanded: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }
}
