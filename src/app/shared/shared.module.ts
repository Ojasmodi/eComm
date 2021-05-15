import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { BannerComponent } from './components/banner/banner.component';
import { RouterModule } from '@angular/router';
import { CategoryCarouselComponent } from './components/category-carousel/category-carousel.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';

@NgModule({
  declarations: [
    ProductGridComponent,
    BannerComponent,
    CategoryCarouselComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    BannerComponent,
    ProductGridComponent,
    CategoryCarouselComponent,
    BreadcrumbComponent,
    TranslateModule,
  ],
})
export class SharedModule {}
