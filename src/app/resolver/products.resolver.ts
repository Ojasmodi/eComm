import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from '../core/models/product';
import { ProductService } from '../product-content/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsResolver implements Resolve<Product[]> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    const categoryId = route.paramMap.get('category');
    return this.productService.getProductsForCategory(
      categoryId != null ? categoryId : ''
    );
  }
}
