import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorMembersComponent } from './professor-members.component';

describe('ProfessorMembersComponent', () => {
  let component: ProfessorMembersComponent;
  let fixture: ComponentFixture<ProfessorMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
