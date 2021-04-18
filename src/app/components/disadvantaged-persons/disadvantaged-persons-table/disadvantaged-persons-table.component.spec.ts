import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisadvantagedPeopleTableComponent } from './disadvantaged-persons-table.component';

describe('DisadvantagedPeopleTableComponent', () => {
  let component: DisadvantagedPeopleTableComponent;
  let fixture: ComponentFixture<DisadvantagedPeopleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisadvantagedPeopleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisadvantagedPeopleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
