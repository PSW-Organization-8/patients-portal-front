import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityBasedAppointmentComponent } from './priority-based-appointment.component';

describe('PriorityBasedAppointmentComponent', () => {
  let component: PriorityBasedAppointmentComponent;
  let fixture: ComponentFixture<PriorityBasedAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorityBasedAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityBasedAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
