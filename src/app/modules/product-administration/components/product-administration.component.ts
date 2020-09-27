import {AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from '../../../services/products.service';
import {FavoriteService} from '../../../services/favorite.service';
import {CdkPortal, DomPortalOutlet} from '@angular/cdk/portal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-administration',
  templateUrl: 'product-administration.component.html',
  styleUrls: ['product-administration.component.scss']
})
export class ProductAdministrationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(CdkPortal)
  headerPortal;

  portalHost: DomPortalOutlet;

  canLeave = false;

  constructor(
    private productsService: ProductsService, private favoriteService: FavoriteService,
    private applicationRef: ApplicationRef, private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver, private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.portalHost = new DomPortalOutlet(
      document.querySelector('#injectHere'), this.componentFactoryResolver, this.applicationRef, this.injector);

    this.portalHost.attachTemplatePortal(this.headerPortal);
  }

  ngOnDestroy(): void {
    this.portalHost.detach();
  }


  handleNewProduct(): void {
    console.log('from product administration');
    this.router.navigate(['/product-administration']);
  }
}
