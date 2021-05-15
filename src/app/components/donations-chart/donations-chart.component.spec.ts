import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationsChartComponent } from './donations-chart.component';

describe('DonationsChartComponent', () => {
  let component: DonationsChartComponent;
  let fixture: ComponentFixture<DonationsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
