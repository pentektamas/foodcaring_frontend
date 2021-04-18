import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisadvantagedPersonsTableSortedComponent } from './disadvantaged-persons-table-sorted.component';

describe('DisadvantagedPersonsTableSortedComponent', () => {
  let component: DisadvantagedPersonsTableSortedComponent;
  let fixture: ComponentFixture<DisadvantagedPersonsTableSortedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisadvantagedPersonsTableSortedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisadvantagedPersonsTableSortedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
