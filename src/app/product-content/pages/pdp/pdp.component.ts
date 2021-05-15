import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/checkout-flow/cart.service';
import { Product } from 'src/app/core/models/product';
import { UserService } from 'src/app/user/user.service';
import { Location } from '@angular/common';
import { CommunicationService } from 'src/app/communication.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { I18nService } from 'src/app/i18n.service';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.less'],
})
export class PdpComponent implements OnInit {
  products: Product[];
  product: Product;
  breadcrumbs: string[] = ['PDP.TITLE'];
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cartService: CartService,
    private userService: UserService,
    private location: Location,
    private router: Router,
    private productService: ProductService,
    private communicationService: CommunicationService,
    private i18nService: I18nService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.spinner.show();
    const productId = this.route.snapshot.paramMap.get('productId');
    this.route.data.subscribe((data) => {
      this.products = data.products;
      this.product = this.findProductById(productId);
      if (this.product == null) {
        this.router.navigateByUrl('/not-found');
      } else {
        this.breadcrumbs.push(this.product.name);
      }
      this.spinner.hide();
    });
    this.subscription = this.communicationService.sessionLangData.subscribe(
      (lang: string) => {
        this.spinner.show();
        const productId = this.route.snapshot.paramMap.get('productId');
        this.productService.getProducts().subscribe(
          (response) => {
            this.products = response;
            this.product = this.findProductById(productId);
            this.translate.use(lang);
            this.spinner.hide();
          },
          (err) => this.spinner.hide()
        );
      }
    );
  }

  findProductById(productId: string): Product {
    const prod: Product[] = this.products.filter((p) => p.id == productId);
    return prod.length ? prod[0] : null;
  }

  addToCart() {
    if (this.userService.isUserAuthorised()) {
      if (this.product.stock) {
        this.cartService
          .addToCart(this.product.id, this.product.price)
          .subscribe((res) => {
            if (res > 0) {
              this.communicationService.sendCartData(res);
              this.toastr.success('Added to cart');
            } else {
              this.toastr.error('Unable to add product');
            }
          });
      } else {
        this.toastr.error('Unable to add product', 'Product is out of stock');
      }
    } else {
      this.toastr.warning('Please login for adding to cart');
      this.router.navigateByUrl('/login');
    }
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
