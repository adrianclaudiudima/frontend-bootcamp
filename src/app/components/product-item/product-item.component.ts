import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Product} from '../../model/product';
import {FavoriteService} from '../../services/favorite.service';
import {Observable, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {FavoriteOverlayService} from '../../services/overlay/favorite-overlay.service';

@Component({
  selector: 'app-product-item',
  templateUrl: 'product-item.component.html',
  styleUrls: ['product-item.component.scss']
})
export class ProductItemComponent implements OnInit, OnDestroy {

  isAtFavorite = false;
  isAtFavoriteSubscription: Subscription;
  product$: Observable<Product>;

  constructor(
    private favoriteService: FavoriteService,
    private activatedRoute: ActivatedRoute,
    private proService: ProductsService,
    private favoriteOverlayService: FavoriteOverlayService) {


  }

  @Input()
  product: Product;

  @Output()
  productAddedToFavorite: EventEmitter<Product> = new EventEmitter<Product>();

  ngOnInit(): void {
    this.product$ = this.activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap(productId => this.proService.loadProductById(Number(productId)))
    );

    this.isAtFavoriteSubscription = this.favoriteService.favoriteProducts$.pipe(
      map(allFavoriteProducts => {
        return !!allFavoriteProducts.find(pf => pf.id === this.product.id);
      })
    ).subscribe(
      v => {
        this.isAtFavorite = v;
      }
    );
  }

  addProductToFavorite(): void {
    this.favoriteService.addProductToFavorite(this.product);
    this.productAddedToFavorite.emit(this.product);
  }

  removeProductFromFavorite(): void {
    this.favoriteService.removeProductFromFavorite(this.product.id);
  }

  ngOnDestroy(): void {
    this.isAtFavoriteSubscription.unsubscribe();
  }


  showFavoriteWidget(element) {
    this.favoriteOverlayService.showFavoriteOverlay(element);

  }
}
