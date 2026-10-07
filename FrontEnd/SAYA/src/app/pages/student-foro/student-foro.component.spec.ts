import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentForoComponent } from './student-foro.component';

describe('StudentForoComponent', () => {
  let component: StudentForoComponent;
  let fixture: ComponentFixture<StudentForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentForoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
