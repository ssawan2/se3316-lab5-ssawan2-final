import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimetableComponent } from './user-timetable.component';

describe('UserTimetableComponent', () => {
  let component: UserTimetableComponent;
  let fixture: ComponentFixture<UserTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTimetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
