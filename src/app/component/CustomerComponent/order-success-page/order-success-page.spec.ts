import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuccessPage } from './order-success-page';

describe('OrderSuccessPage', () => {
  let component: OrderSuccessPage;
  let fixture: ComponentFixture<OrderSuccessPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSuccessPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
