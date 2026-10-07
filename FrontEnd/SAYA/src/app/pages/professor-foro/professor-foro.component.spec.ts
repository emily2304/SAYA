import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorForoComponent } from './professor-foro.component';

describe('ProfessorForoComponent', () => {
  let component: ProfessorForoComponent;
  let fixture: ComponentFixture<ProfessorForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorForoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
