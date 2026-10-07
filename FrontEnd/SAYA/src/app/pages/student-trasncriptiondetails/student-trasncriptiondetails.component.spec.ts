import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTrasncriptiondetailsComponent } from './student-trasncriptiondetails.component';

describe('StudentTrasncriptiondetailsComponent', () => {
  let component: StudentTrasncriptiondetailsComponent;
  let fixture: ComponentFixture<StudentTrasncriptiondetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentTrasncriptiondetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTrasncriptiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
