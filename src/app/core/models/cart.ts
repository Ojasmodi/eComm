import { CartEntry } from './cart-entry';

export interface Cart {
  id: string;
  entries?: CartEntry[];
  totalPrice?: number;
  totalCount?: number;
}
