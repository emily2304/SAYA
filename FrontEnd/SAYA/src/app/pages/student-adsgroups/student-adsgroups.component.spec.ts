import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdsgroupsComponent } from './student-adsgroups.component';

describe('StudentAdsgroupsComponent', () => {
  let component: StudentAdsgroupsComponent;
  let fixture: ComponentFixture<StudentAdsgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAdsgroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAdsgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
