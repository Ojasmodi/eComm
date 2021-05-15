import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/checkout-flow/cart.service';
import { CommunicationService } from 'src/app/communication.service';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.less'],
})
export class MiniCartComponent implements OnInit {
  totalItems: number = 0;
  constructor(
    private communicationService: CommunicationService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.communicationService.cartData.subscribe((data: number) => {
      this.totalItems = data;
    });
    let cart = this.cartService.getSessionCart();
    if (cart && cart.totalCount) {
      this.totalItems = cart.totalCount;
    }
  }
}
