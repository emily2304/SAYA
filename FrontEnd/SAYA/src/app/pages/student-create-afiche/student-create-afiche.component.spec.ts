import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCreateAficheComponent } from './student-create-afiche.component';

describe('StudentCreateAficheComponent', () => {
  let component: StudentCreateAficheComponent;
  let fixture: ComponentFixture<StudentCreateAficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCreateAficheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCreateAficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
