import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAficheDetailsComponent } from './student-afiche-details.component';

describe('StudentAficheDetailsComponent', () => {
  let component: StudentAficheDetailsComponent;
  let fixture: ComponentFixture<StudentAficheDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAficheDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAficheDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
