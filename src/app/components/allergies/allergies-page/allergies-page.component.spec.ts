import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergiesPageComponent } from './allergies-page.component';

describe('AllergiesPageComponent', () => {
  let component: AllergiesPageComponent;
  let fixture: ComponentFixture<AllergiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergiesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
