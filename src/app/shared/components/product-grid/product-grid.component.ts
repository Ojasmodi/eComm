import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.less'],
})
export class ProductGridComponent implements OnInit {
  @Input() product: Product;
  constructor() {}

  ngOnInit(): void {}
}
