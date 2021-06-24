import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'about-alert',
  templateUrl: './about-alert.component.html',
  styleUrls: ['./about-alert.component.scss']
})
export class AboutAlertComponent implements OnInit {

  message: string | undefined;
  cssClass: string = '';
  constructor(private alert: AlertService) { }

  ngOnInit(): void {
    this.alert.alertState$.subscribe(a => {
      switch (a?.type) {
        case 'success': this.cssClass = 'alert alert-success'; break;
        case 'error': this.cssClass = 'alert alert-danger'; break;
      }
      this.message = a?.text;
    });
  }

}
