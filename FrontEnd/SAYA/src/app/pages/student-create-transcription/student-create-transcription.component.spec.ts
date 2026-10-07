import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCreateTranscriptionComponent } from './student-create-transcription.component';

describe('StudentCreateTranscriptionComponent', () => {
  let component: StudentCreateTranscriptionComponent;
  let fixture: ComponentFixture<StudentCreateTranscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCreateTranscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCreateTranscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
