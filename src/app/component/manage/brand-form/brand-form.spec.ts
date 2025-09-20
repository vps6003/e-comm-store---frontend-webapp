import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandForm } from './brand-form';

describe('BrandForm', () => {
  let component: BrandForm;
  let fixture: ComponentFixture<BrandForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
