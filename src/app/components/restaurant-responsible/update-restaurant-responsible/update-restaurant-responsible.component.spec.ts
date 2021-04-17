import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRestaurantResponsibleComponent } from './update-restaurant-responsible.component';

describe('UpdateRestaurantResponsibleComponent', () => {
  let component: UpdateRestaurantResponsibleComponent;
  let fixture: ComponentFixture<UpdateRestaurantResponsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRestaurantResponsibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRestaurantResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
