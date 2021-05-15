import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/communication.service';
import { I18nService } from 'src/app/i18n.service';
import { ProductService } from 'src/app/product-content/product.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit, OnDestroy {
  homepageCategories: Category[];
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private communicationService: CommunicationService,
    private productService: ProductService,
    public i18Service: I18nService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getHomePageCategories();
    this.subscription = this.communicationService.sessionLangData.subscribe(
      (lang: string) => {
        this.translate.use(lang);
        this.productService.getCategoriesForCarousel().subscribe((response) => {
          this.homepageCategories = response;
        });
      }
    );
  }

  getHomePageCategories() {
    this.route.data.subscribe((data) => {
      this.homepageCategories = data.categoryList;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
