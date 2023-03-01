import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedDishComponent } from './detailed-dish.component';

describe('DetailedDishComponent', () => {
  let component: DetailedDishComponent;
  let fixture: ComponentFixture<DetailedDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedDishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
