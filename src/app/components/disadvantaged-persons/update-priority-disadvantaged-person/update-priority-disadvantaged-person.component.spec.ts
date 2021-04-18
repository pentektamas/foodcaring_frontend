import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePriorityDisadvantagedPersonComponent } from './update-priority-disadvantaged-person.component';

describe('UpdatePriorityDisadvantagedPersonComponent', () => {
  let component: UpdatePriorityDisadvantagedPersonComponent;
  let fixture: ComponentFixture<UpdatePriorityDisadvantagedPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePriorityDisadvantagedPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePriorityDisadvantagedPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
