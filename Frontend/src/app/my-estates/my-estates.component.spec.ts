import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEstatesComponent } from './my-estates.component';

describe('MyEstatesComponent', () => {
  let component: MyEstatesComponent;
  let fixture: ComponentFixture<MyEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
