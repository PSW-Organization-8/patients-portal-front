import { TestBed } from '@angular/core/testing';

import { StandardAppointmentService } from './standard-appointment.service';

describe('StandardAppointmentService', () => {
  let service: StandardAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
