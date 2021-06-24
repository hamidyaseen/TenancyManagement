import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAlertComponent } from './about-alert.component';

describe('AboutAlertComponent', () => {
  let component: AboutAlertComponent;
  let fixture: ComponentFixture<AboutAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
