import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private httpClient: HttpClient;

  products: Array<Product> = [];
  productsFavorite: Array<Product> = [];

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  ngOnInit(): void {
    this.httpClient.get<Array<Product>>('http://localhost:3000/products').subscribe(
      value => {
        this.products = value;
      }
    );

  }

  handleProductAddedToFavorite(product: Product): void {
    this.productsFavorite.push(product);
  }

  ngOnDestroy(): void {
    console.log('On destroy from product list');
  }

}
