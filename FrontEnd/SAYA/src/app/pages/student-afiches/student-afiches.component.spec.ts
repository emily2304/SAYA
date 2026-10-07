import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAfichesComponent } from './student-afiches.component';

describe('StudentAfichesComponent', () => {
  let component: StudentAfichesComponent;
  let fixture: ComponentFixture<StudentAfichesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAfichesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAfichesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
