import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { ProductService } from 'src/app/product-content/product.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryCarouselResolver implements Resolve<Category[]> {
  constructor(private readonly productService: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Category[]> {
    return this.productService.getCategoriesForCarousel();
  }
}
