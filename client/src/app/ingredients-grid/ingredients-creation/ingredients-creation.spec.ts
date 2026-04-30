import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsCreation } from './ingredients-creation';

describe('IngredientsCreation', () => {
  let component: IngredientsCreation;
  let fixture: ComponentFixture<IngredientsCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
