import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCreateGroupComponent } from './professor-create-group.component';

describe('ProfessorCreateGroupComponent', () => {
  let component: ProfessorCreateGroupComponent;
  let fixture: ComponentFixture<ProfessorCreateGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorCreateGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorCreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
