import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorDonationsTableComponent } from './donor-donations-table.component';

describe('DonationsTableComponent', () => {
  let component: DonorDonationsTableComponent;
  let fixture: ComponentFixture<DonorDonationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorDonationsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorDonationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
