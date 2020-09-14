import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {Subject, Subscription} from 'rxjs';
import {ProductsStateService} from '../../services/products-state.service';
import {DomainStatus, Status} from '../../modules/shared/models/DomainStatus';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: [ 'product-list.component.scss' ]
})
export class ProductListComponent implements OnInit, OnDestroy {

  s = new Subject();
  showProductFavorite = false;
  requestStatuses: typeof Status = Status;
  domainStatusProducts: DomainStatus<Array<Product>>;
  productsFavorite: Array<Product> = [];
  hasError: boolean;
  subscriptions: Subscription[] = [];

  constructor(private productServiceState: ProductsStateService) {
  }

  ngOnInit(): void {
    this.loadProducts();
    this.subscriptions.push(
      this.productServiceState.productsDomainStatus$.subscribe((productsDomainStatus: DomainStatus<Array<Product>>) => {
        this.domainStatusProducts = productsDomainStatus;
      })
    );
  }

  handleProductAddedToFavorite(product: Product): void {
    this.productsFavorite.push(product);
  }

  ngOnDestroy(): void {
    this.s.next();
    this.s.complete();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public loadProducts(): void {
    this.subscriptions.push(this.productServiceState.loadProductsAndHandleResponse().subscribe());
  }

}
