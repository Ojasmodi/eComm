import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommunicationService } from '../communication.service';
import { Cart } from '../core/models/cart';
import { CartEntry } from '../core/models/cart-entry';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private SESSION_CART: string = 'session-cart';

  constructor(private communicationService: CommunicationService) {}

  public getSessionCartName() {
    return this.SESSION_CART;
  }

  deleteCart() {
    localStorage.removeItem(this.getSessionCartName());
    this.communicationService.sendCartData(0);
  }

  addToCart(productId: string, price: number): Observable<number> {
    let cart: Cart = this.getSessionCart();
    if (cart != null) {
      if (this.isEntryPresentInCart(productId)) {
        const entry: CartEntry = this.getCartEntryByProductId(productId);
        entry.qty = entry.qty + 1;
        entry.totalPrice = entry.qty * entry.entryPrice;
        const entries = cart.entries;
        const findIndexOfEntry = entries.findIndex(
          (e) => e.productId == productId
        );
        entries[findIndexOfEntry] = entry;
        cart.totalPrice = this.getTotalPrice(entries);
        this.updateSessionCart(cart);
      } else {
        const entry: CartEntry = {
          id: (Math.random() * 1000).toString(),
          qty: 1,
          productId: productId,
          entryPrice: price,
          totalPrice: 1 * price,
        };
        cart.entries.push(entry);
        cart.totalPrice = this.getTotalPrice(cart.entries);
        this.updateSessionCart(cart);
      }
      return of(cart.totalCount);
    } else {
      let entry: CartEntry = {
        id: (Math.random() * 1000).toString(),
        qty: 1,
        productId: productId,
        entryPrice: price,
        totalPrice: 1 * price,
      };
      let cart: Cart = { id: (Math.random() * 1000).toString() };
      cart.entries = [];
      cart.entries.push(entry);
      this.updateSessionCart(cart);
      cart.totalPrice = this.getTotalPrice(cart.entries);
      this.updateSessionCart(cart);
      return of(cart.totalCount);
    }
  }

  getCartEntryByProductId(productId: string): CartEntry {
    let cart: Cart = this.getSessionCart();
    let entries: CartEntry[] = cart.entries;
    const entry = entries.filter((e) => e.productId == productId);
    return entry ? entry[0] : null;
  }

  isEntryPresentInCart(productId: string): boolean {
    let cart: Cart = this.getSessionCart();
    let entries: CartEntry[] = cart.entries;
    const entry = entries.filter((e) => e.productId == productId);
    return entry.length > 0 ? true : false;
  }

  getSessionCart() {
    const cart = localStorage.getItem(this.SESSION_CART);
    return cart ? JSON.parse(cart) : null;
  }

  hasValidCart(): boolean {
    return (
      this.getSessionCart() != null && this.getSessionCart().entries.length > 0
    );
  }

  updateSessionCart(cart: Cart) {
    let count = 0;
    cart.entries.forEach((e) => (count += e.qty));
    cart.totalCount = count;
    localStorage.setItem(this.SESSION_CART, JSON.stringify(cart));
  }

  getTotalPrice(entries: CartEntry[]): number {
    let cart: Cart = this.getSessionCart();
    let price: number = 0;
    if (cart != null && cart.entries.length > 0) {
      entries.forEach((e) => {
        price = price + e.qty * e.entryPrice;
      });
    }
    return price;
  }

  updateQtyOfProduct(productId: string, qty: number) {
    const cart: Cart = this.getSessionCart();
    const entry: CartEntry = this.getCartEntryByProductId(productId);
    let entries = cart.entries;
    const findIndexOfEntry = entries.findIndex((e) => e.productId == productId);
    if (qty > 0) {
      entry.qty = qty;
      entry.totalPrice = entry.qty * entry.entryPrice;
      entries[findIndexOfEntry] = entry;
    } else {
      entries[findIndexOfEntry] = null;
      cart.entries = entries.filter(function (el) {
        return el != null;
      });
    }
    this.updateSessionCart(cart);
    cart.totalPrice = this.getTotalPrice(cart.entries);
    this.updateSessionCart(cart);
    let data = {
      cart: cart,
      status: true,
    };
    return of(data);
  }
}
