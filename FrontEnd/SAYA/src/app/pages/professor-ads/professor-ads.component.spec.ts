import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorAdsComponent } from './professor-ads.component';

describe('ProfessorAdsComponent', () => {
  let component: ProfessorAdsComponent;
  let fixture: ComponentFixture<ProfessorAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
