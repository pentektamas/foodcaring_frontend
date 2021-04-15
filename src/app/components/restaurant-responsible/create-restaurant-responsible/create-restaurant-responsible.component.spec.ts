import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestaurantResponsibleComponent } from './create-restaurant-responsible.component';

describe('CreateRestaurantResponsibleComponent', () => {
  let component: CreateRestaurantResponsibleComponent;
  let fixture: ComponentFixture<CreateRestaurantResponsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRestaurantResponsibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRestaurantResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
