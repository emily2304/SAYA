import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorGroupsComponent } from './professor-groups.component';

describe('ProfessorGroupsComponent', () => {
  let component: ProfessorGroupsComponent;
  let fixture: ComponentFixture<ProfessorGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
