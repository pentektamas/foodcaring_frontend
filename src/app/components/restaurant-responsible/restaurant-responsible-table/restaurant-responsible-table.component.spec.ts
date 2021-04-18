import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantResponsibleTableComponent } from './restaurant-responsible-table.component';

describe('RestaurantResponsibleTableComponent', () => {
  let component: RestaurantResponsibleTableComponent;
  let fixture: ComponentFixture<RestaurantResponsibleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantResponsibleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantResponsibleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
