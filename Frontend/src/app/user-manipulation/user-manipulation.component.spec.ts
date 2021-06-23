import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManipulationComponent } from './user-manipulation.component';

describe('UserManipulationComponent', () => {
  let component: UserManipulationComponent;
  let fixture: ComponentFixture<UserManipulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManipulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
