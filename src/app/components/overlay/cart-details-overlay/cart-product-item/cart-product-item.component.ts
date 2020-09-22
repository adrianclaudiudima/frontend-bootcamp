import {Component, Input, OnInit} from '@angular/core';
import {CartProduct} from '../../../../model/product';
import {FormControl} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {RemoveProductFromCartAction, UpdateProductFromCartAction} from '../../../../store/cart/cart.actions';
import {AppState} from '../../../../store';
import {Store} from '@ngrx/store';
import {ProductItemType} from './product-item-type.enum';

@Component({
  selector: 'app-cart-product-item',
  templateUrl: 'cart-product-item.component.html',
  styleUrls: ['cart-product-item.component.scss']
})
export class CartProductItemComponent implements OnInit {

  @Input()
  item: CartProduct;
  @Input()
  type: ProductItemType;
  productItemType: typeof ProductItemType = ProductItemType;

  quantityControl: FormControl;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.quantityControl = new FormControl(this.item.quantity);
  }

  removeProduct(): void {
    this.store.dispatch(new RemoveProductFromCartAction(this.item.id));
  }

  handleQuantitySelection(event: MatSelectChange): void {
    if (event.value === 0) {
      this.removeProduct()
    } else {
      const updatedProduct: CartProduct = { ...this.item, quantity: event.value };
      this.store.dispatch(new UpdateProductFromCartAction(updatedProduct));
    }
  }
}
