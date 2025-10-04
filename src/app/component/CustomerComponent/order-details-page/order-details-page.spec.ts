import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsPage } from './order-details-page';

describe('OrderDetailsPage', () => {
  let component: OrderDetailsPage;
  let fixture: ComponentFixture<OrderDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
