import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorGroupsDetailsComponent } from './professor-groups-details.component';

describe('ProfessorGroupsDetailsComponent', () => {
  let component: ProfessorGroupsDetailsComponent;
  let fixture: ComponentFixture<ProfessorGroupsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorGroupsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorGroupsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
