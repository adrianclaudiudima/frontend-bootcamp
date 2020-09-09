import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductsService} from '../../services/products.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  s = new Subject();
  showProductFavorite = false;
  products: Array<Product> = [];
  productsFavorite: Array<Product> = [];

  constructor(private productsService: ProductsService, private router: Router) {
  }

  ngOnInit(): void {
    this.productsService.loadProducts().pipe(
      takeUntil(this.s),
    ).subscribe(v => {
      this.products = v;
    });

    /*setTimeout(() => {
      /!*this.router.navigateByUrl('favorites');*!/
      this.router.navigate(['favorites'], {queryParams: {i: 2}});
    }, 5000)*/

  }

  handleProductAddedToFavorite(product: Product): void {
    this.productsFavorite.push(product);
  }

  ngOnDestroy(): void {
    console.log('On destroy from product list');
    this.s.next();
    this.s.complete();
  }

}
