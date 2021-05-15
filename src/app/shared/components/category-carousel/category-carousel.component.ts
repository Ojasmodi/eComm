import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.less'],
})
export class CategoryCarouselComponent implements OnInit {
  @Input() homepageCategory: Category;
  constructor() {}

  ngOnInit(): void {}
}
