import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import { DeliveryAddressComponent } from './pages/delivery-address/delivery-address.component';
import { CheckoutFlowRoutingModule } from './checkout-flow-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';
import { I18nService } from '../i18n.service';

@NgModule({
  declarations: [CartComponent, DeliveryAddressComponent],
  imports: [
    CommonModule,
    CheckoutFlowRoutingModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule,
  ],
  providers: [I18nService],
})
export class CheckoutFlowModule {}
