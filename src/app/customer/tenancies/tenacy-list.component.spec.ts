import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenacyListComponent } from './tenacy-list.component';

describe('TenacyListComponent', () => {
  let component: TenacyListComponent;
  let fixture: ComponentFixture<TenacyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenacyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenacyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
