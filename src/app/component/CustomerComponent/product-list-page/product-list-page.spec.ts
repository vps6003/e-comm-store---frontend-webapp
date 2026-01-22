import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ProductListPage } from './product-list-page';

describe('ProductListPage', () => {
  let component: ProductListPage;
  let fixture: ComponentFixture<ProductListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListPage],
      providers: [
        // Prevent real router navigation during tests
        {
          provide: Router,
          useValue: { navigateByUrl: jest.fn() },
        },

        // Provide queryParams so ngOnInit doesn't crash or redirect
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                searchTerm: 'test',
                categoryId: null,
                brandId: null,
              },
            },
            queryParams: of({
              searchTerm: 'test',
              categoryId: null,
              brandId: null,
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
