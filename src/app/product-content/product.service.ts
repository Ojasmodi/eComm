import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ObservableInput, pipe, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Category } from '../core/models/category';
import { Product } from '../core/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private router: Router) {}

  getProducts(): Observable<Product[]> {
    const sessionLang = sessionStorage.getItem('language') || 'en';
    return this.http.get<Product[]>(
      `./../assets/responses/products_${sessionLang}.json`
    );
  }

  getCategoriesForCarousel(): Observable<Category[]> {
    const sessionLang = sessionStorage.getItem('language') || 'en';
    return this.http.get<Category[]>(
      `./../assets/responses/category-carousel_${sessionLang}.json`
    );
  }

  getProductsForCategory(categoryCode: string): Observable<Product[]> {
    const sessionLang = sessionStorage.getItem('language') || 'en';
    return this.http.get<Product[]>(
      `./../assets/responses/${categoryCode}_${sessionLang}.json`
    );
  }

  getNavBarData(): Observable<any> {
    const sessionLang = sessionStorage.getItem('language') || 'en';
    return this.http.get(`./../assets/responses/navbar_${sessionLang}.json`);
  }
}
