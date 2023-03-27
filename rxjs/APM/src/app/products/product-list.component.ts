import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { catchError, EMPTY, filter, map, Observable, of } from 'rxjs';
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
  selectedCategoryId = 1;

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError(err => {
      console.log(err);
      this.errorMessage = err;
      return EMPTY;
    })
  );

  products$ = this.productService.productWithCategory$.pipe(
    catchError(err => {
      console.log(err);
      this.errorMessage = err;
      return EMPTY;
    })
  );


  productsSimpleFilter$ = this.productService.productWithCategory$.pipe(
    // filter(products => products.filter),
    map(products => products.filter(product => this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true))
  )

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {

  }


  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    // continuar aki
    // this.productCategoryService.cate



    this.selectedCategoryId = +categoryId;
  }
}
