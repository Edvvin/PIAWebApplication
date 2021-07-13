import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEstatesComponent } from './verify-estates.component';

describe('VerifyEstatesComponent', () => {
  let component: VerifyEstatesComponent;
  let fixture: ComponentFixture<VerifyEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
