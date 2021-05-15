import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/communication.service';
import { Product } from 'src/app/core/models/product';
import { I18nService } from 'src/app/i18n.service';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-grid-page',
  templateUrl: './grid-page.component.html',
  styleUrls: ['./grid-page.component.less'],
})
export class GridPageComponent implements OnInit {
  products: Product[] = [];
  originalProducts: Product[] = [];
  breadcrumbs: string[] = ['PLP.CATEGORY'];
  search: string = 'PLP.SEARCH';
  subscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private spinner: NgxSpinnerService,
    private communicationService: CommunicationService,
    private i18nService: I18nService,
    private translate: TranslateService,
    private productService: ProductService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.spinner.show();
    this.breadcrumbs.push(this.route.snapshot.paramMap.get('category'));
    this.route.data.subscribe(
      (data) => {
        this.products = data.productList;
        this.originalProducts = this.products;
        this.spinner.hide();
      },
      (error) => console.log('Error occured')
    );
    this.subscription = this.communicationService.sessionLangData.subscribe(
      (lang: string) => {
        this.spinner.show();
        const categoryCode = this.route.snapshot.paramMap.get('category');
        this.productService.getProductsForCategory(categoryCode).subscribe(
          (response) => {
            this.originalProducts = response;
            this.products = response;
            this.translate.use(lang);
            this.spinner.hide();
          },
          (err) => this.spinner.hide()
        );
      }
    );
  }

  searchProducts(searchText?) {
    searchText = searchText.toLowerCase();
    this.spinner.show();
    let result: Product[] = [];
    if (!searchText) {
      this.products = this.originalProducts;
      this.spinner.hide();
      return;
    }
    for (let product of this.originalProducts) {
      if (
        product.name.toLowerCase().search(searchText) > -1 ||
        this.isCategoryPresent(product.category, searchText)
      ) {
        result.push(product);
      }
    }
    this.products = result;
    this.spinner.hide();
  }

  isCategoryPresent(categories: string[], searchText): boolean {
    categories = categories.filter(
      (c) => c.toLowerCase() == searchText || c.search(searchText) > -1
    );
    return categories.length > 0 ? true : false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
