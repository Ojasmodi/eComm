import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private isUserLoggedIn = new Subject();
  loginData = this.isUserLoggedIn.asObservable();

  private cartCount = new Subject();
  cartData = this.cartCount.asObservable();

  private currentLang = new BehaviorSubject(
    sessionStorage.getItem('language') || 'en'
  );
  sessionLangData = this.currentLang.asObservable();

  setLoggedIn(data: any) {
    this.isUserLoggedIn.next(data);
  }

  sendCartData(data: number) {
    this.cartCount.next(data);
  }

  sendUpdateLangEvent(data: string) {
    this.currentLang.next(data);
  }
  constructor() {}
}
