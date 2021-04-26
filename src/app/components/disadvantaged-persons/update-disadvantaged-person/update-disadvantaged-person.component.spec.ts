import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDisadvantagedPersonComponent } from './update-disadvantaged-person.component';

describe('UpdateDisadvantagedPersonComponent', () => {
  let component: UpdateDisadvantagedPersonComponent;
  let fixture: ComponentFixture<UpdateDisadvantagedPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDisadvantagedPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDisadvantagedPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
