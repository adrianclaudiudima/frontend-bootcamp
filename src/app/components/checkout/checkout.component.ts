import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppState} from '../../store';
import {select, Store} from '@ngrx/store';
import {ProductWithQuantity} from '../../model/product';
import {Observable} from 'rxjs';
import {ProductItemType} from '../overlay/cart-details-overlay/cart-product-item/product-item-type.enum';
import {Order} from '../../model/order';
import {take} from 'rxjs/operators';
import * as fromCart from '../../store/cart';
import * as fromOrders from './../../store/orders';

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm: FormGroup;
  public cartProducts$: Observable<Array<ProductWithQuantity>>;
  public productItemType: typeof ProductItemType = ProductItemType;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.cartProducts$ = this.store.pipe(
      select(fromCart.selectProducts)
    );
  }

  public submit(): void {
    this.cartProducts$.pipe(take(1)).subscribe(cartProducts => {
      const order: Order = {
        ...this.checkoutForm.value as Order,
        products: cartProducts
      };
      this.store.dispatch(new fromOrders.CreateCheckoutOrderAction(order));
    });
  }

  private initForm() {
    this.checkoutForm = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'address': ['', Validators.required],
      'phone': ['', Validators.required],
    });
  }
}
