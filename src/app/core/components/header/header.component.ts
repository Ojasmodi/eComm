import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/checkout-flow/cart.service';
import { CommunicationService } from 'src/app/communication.service';
import { ProductService } from 'src/app/product-content/product.service';
import { UserService } from 'src/app/user/user.service';
import { I18nService } from '../../../i18n.service';
import { Language } from '../../models/language';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarData: any = [];
  isUserLoggedIn: boolean = false;
  currentLang: string = 'en';
  user = { userName: '' };
  languages: Language[] = [];
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private communicationService: CommunicationService,
    private cartService: CartService,
    public i18Service: I18nService,
    private translate: TranslateService
  ) {
    this.languages = i18Service.getAllLanguages();
    this.currentLang = i18Service.getCurrentLang();
  }

  updateSessionLanguage(value: string) {
    this.i18Service.updateSessionLanguage(value);
  }

  ngOnInit(): void {
    this.user.userName = localStorage.getItem('username');
    this.isUserLoggedIn = this.userService.isUserAuthorised();
    this.getNavBarData();
    this.communicationService.loginData.subscribe((data: any) => {
      this.isUserLoggedIn = data.loginStatus;
      this.user.userName = data.username;
    });
    this.subscription = this.communicationService.sessionLangData.subscribe(
      (lang: string) => {
        this.translate.use(lang);
        this.getNavBarData();
      }
    );
  }

  getNavBarData() {
    this.productService.getNavBarData().subscribe(
      (response) => {
        this.navbarData = response;
      },
      (error) => {
        this.toastr.warning('Error occured while loading nav bar');
      }
    );
  }

  showSubcategories(categoryCode: string) {
    const categories = this.navbarData.filter(
      (data) => data.id == categoryCode
    );
    if (categories.length > 0) {
      categories[0].showChildren = true;
    }
  }

  hideSubCategories(categoryCode: string) {
    const categories = this.navbarData.filter(
      (data) => data.id == categoryCode
    );
    setTimeout(() => {
      if (categories.length > 0) {
        categories[0].showChildren = false;
      }
    }, 2000);
  }

  logout() {
    this.userService.logout();
    this.communicationService.setLoggedIn(false);
    this.cartService.deleteCart();
    this.toastr.success('Logout success.');
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
