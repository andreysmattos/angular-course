import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { catchError, combineLatest, EMPTY, filter, map, Observable, of, startWith, Subject, tap } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoryService } from '../product-categories/product-category.service';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';

  private categorySelectedSubject = new Subject<number>();

  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest([this.productService.products$, this.categorySelectedAction$.pipe(startWith(0))]).pipe(
    map(([products, selectedCategoryId]) => products.filter(_products => selectedCategoryId ? _products.categoryId === selectedCategoryId : true)),
    tap(item => {
      console.log('\\/')
      console.log(item)
      console.log('/\\');
    }),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  )


  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError(err => {
      console.log(err);
      this.errorMessage = err;
      return EMPTY;
    })
  );



  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {

  }


  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
