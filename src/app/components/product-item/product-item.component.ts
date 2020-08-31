import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-item',
  templateUrl: 'product-item.component.html',
  styleUrls: ['product-item.component.scss']
})
export class ProductItemComponent {

  constructor() {
  }

  @Input()
  product: Product;

  @Output()
  productAddedToFavorite: EventEmitter<Product> = new EventEmitter<Product>();

  addProductToFavorite(): void {
    this.productAddedToFavorite.emit(this.product);
  }

}
