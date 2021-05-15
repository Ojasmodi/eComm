import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdpComponent } from './pages/pdp/pdp.component';
import { GridPageComponent } from './pages/grid-page/grid-page.component';
import { ProductService } from './product.service';
import { ProductRoutingModule } from './product-routing.module';
import { CartService } from '../checkout-flow/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { I18nService } from '../i18n.service';

@NgModule({
  declarations: [GridPageComponent, PdpComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  providers: [CartService, I18nService],
})
export class ProductContentModule {}
