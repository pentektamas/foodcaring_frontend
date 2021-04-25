import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDisadvantagedPersonComponent } from './create-disadvantaged-person.component';

describe('CreateDisadvantagedPersonComponent', () => {
  let component: CreateDisadvantagedPersonComponent;
  let fixture: ComponentFixture<CreateDisadvantagedPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDisadvantagedPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDisadvantagedPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
