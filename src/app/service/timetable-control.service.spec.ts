import { TestBed } from '@angular/core/testing';

import { TimetableControlService } from './timetable-control.service';

describe('TimetableControlService', () => {
  let service: TimetableControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimetableControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
