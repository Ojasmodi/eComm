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
export class PdpResolver implements Resolve<Product[]> {
  constructor(private readonly productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    // const productId = route.paramMap.get('productId');
    return this.productService.getProducts();
  }
}
