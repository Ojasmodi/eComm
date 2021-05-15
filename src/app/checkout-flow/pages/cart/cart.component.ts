import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/communication.service';
import { Cart } from 'src/app/core/models/cart';
import { I18nService } from 'src/app/i18n.service';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart;
  hasEntries: boolean = false;
  breadcrumbs: string[] = ['CART.TEXT'];
  subscription: Subscription;
  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private communicationService: CommunicationService,
    private i18nService: I18nService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.subscription = this.communicationService.sessionLangData.subscribe(
      (lang: string) => {
        this.translate.use(lang);
      }
    );
    this.cart = this.cartService.getSessionCart();
    if (this.cart != null)
      this.hasEntries = this.cart.entries.length > 0 ? true : false;
    this.spinner.hide();
  }

  updateEntryQty(productId: string, qty: number) {
    this.spinner.show();
    this.cartService
      .updateQtyOfProduct(productId, qty)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status) {
          this.cart = response.cart;
          this.communicationService.sendCartData(this.cart.totalCount);
          if (this.cart != null)
            this.hasEntries = this.cart.entries.length > 0 ? true : false;
          if (qty != 0) {
            this.toastr.success('Quantity updated successfully.');
          } else {
            this.toastr.success('Product removed successfully.');
          }
        } else {
          this.toastr.error('Some error occured.');
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
