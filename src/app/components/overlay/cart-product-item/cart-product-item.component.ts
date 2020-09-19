import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatSelectChange } from '@angular/material/select';
import { CartProduct } from '../../../model/product';
import { UpdateProductFromCartAction, RemoveProductFromCartAction } from '../../../store/cart/cart.actions';
import { AppState } from '../../../store/index';

@Component({
  selector: 'app-cart-product-item',
  templateUrl: 'cart-product-item.component.html',
  styleUrls: ['cart-product-item.component.scss']
})
export class CartProductItemComponent implements OnInit {
  @Input()
  item: CartProduct;
  quantityControl: FormControl;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.quantityControl = new FormControl(this.item.quantity);
  }

  removeProduct() {
    this.store.dispatch(new RemoveProductFromCartAction(this.item.id));
  }

  handleQuantitySelection(event: MatSelectChange) {
    if (event.value === 0) {
      this.removeProduct();
    } else {
      const updatedProduct: CartProduct = { ...this.item, quantity: event.value };
      this.store.dispatch(new UpdateProductFromCartAction(updatedProduct));
    }
  }
}
