import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorEditeGroupsComponent } from './professor-edite-groups.component';

describe('ProfessorEditeGroupsComponent', () => {
  let component: ProfessorEditeGroupsComponent;
  let fixture: ComponentFixture<ProfessorEditeGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorEditeGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorEditeGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
