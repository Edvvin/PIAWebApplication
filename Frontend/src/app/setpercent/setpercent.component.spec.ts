import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetpercentComponent } from './setpercent.component';

describe('SetpercentComponent', () => {
  let component: SetpercentComponent;
  let fixture: ComponentFixture<SetpercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetpercentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetpercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
