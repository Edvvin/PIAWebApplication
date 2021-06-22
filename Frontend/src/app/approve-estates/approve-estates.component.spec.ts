import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEstatesComponent } from './approve-estates.component';

describe('ApproveEstatesComponent', () => {
  let component: ApproveEstatesComponent;
  let fixture: ComponentFixture<ApproveEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
