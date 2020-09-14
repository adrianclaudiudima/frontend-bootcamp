import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../model/product';
import {ProductsService} from '../../../../services/products.service';
import {ProductAdministrationService} from '../../services/product-administration.service';
import {switchMap} from 'rxjs/operators';
import {DomainStatus, Status} from '../../../shared/models/DomainStatus';
import {ProductsStateService} from '../../../../services/products-state.service';

@Component({
  selector: 'app-product-list-administration',
  templateUrl: 'product-list-administration.component.html',
  styleUrls: ['product-list-administration.component.scss']
})
export class ProductListAdministrationComponent implements OnInit {
  products: DomainStatus<Array<Product>> = {
    domain: undefined,
    requestStatus: {
      errorMessage: undefined,
      status: Status.NEW
    }
  };

  constructor(private productsService: ProductsService,
              private productsStateService: ProductsStateService,
              private productAdministrationService: ProductAdministrationService) {
  }

  ngOnInit(): void {
    this.productsStateService.productsDomainStatus$.subscribe(products => {
      this.products = products;
    });
  }


  removeProduct(id: number): void {
    this.productAdministrationService.removeProduct(id)
      .pipe(
        switchMap((value) => this.productsStateService.loadProductsAndHandleResponse()),
      ).subscribe(newListOfProducts => {
      this.products = newListOfProducts;
    });
  }

}
