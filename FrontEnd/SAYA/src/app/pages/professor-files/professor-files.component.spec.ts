import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorFilesComponent } from './professor-files.component';

describe('ProfessorFilesComponent', () => {
  let component: ProfessorFilesComponent;
  let fixture: ComponentFixture<ProfessorFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
