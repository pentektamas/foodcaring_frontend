import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyMenuTableComponent } from './weekly-menu-table.component';

describe('WeeklyMenuTableComponent', () => {
  let component: WeeklyMenuTableComponent;
  let fixture: ComponentFixture<WeeklyMenuTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyMenuTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyMenuTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
