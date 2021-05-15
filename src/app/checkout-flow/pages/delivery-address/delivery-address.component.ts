import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/communication.service';
import { Cart } from 'src/app/core/models/cart';
import { I18nService } from 'src/app/i18n.service';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.less'],
})
export class DeliveryAddressComponent implements OnInit, OnDestroy {
  deliveryAddressForm: FormGroup;
  cart: Cart;
  breadcrumbs: string[] = ['CART.CHECKOUT'];
  subscription: Subscription;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cartService: CartService,
    private communicationService: CommunicationService,
    private i18nService: I18nService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    if (!this.cartService.hasValidCart()) {
      this.toastr.warning('Cart has no products.');
      this.route.navigate(['/']);
    }
    this.deliveryAddressForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
    });
    this.subscription = this.communicationService.sessionLangData.subscribe(
      (lang: string) => {
        this.translate.use(lang);
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.deliveryAddressForm.controls;
  }

  onSubmit() {
    this.toastr.success('Order placed successfully');
    this.cartService.deleteCart();
    this.route.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
