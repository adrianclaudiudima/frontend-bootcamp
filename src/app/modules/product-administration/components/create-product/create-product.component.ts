import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ProductAdministrationService} from '../../services/product-administration.service';
import {Product} from '../../../../model/product';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, first, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-create-product',
  templateUrl: 'create-product.component.html',
  styleUrls: ['create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  productFormGroup: FormGroup;
  successfullyCreatedProduct = false;
  failedCreatingProduct = false;
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder, private productAdministrationService: ProductAdministrationService) {
  }

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      productTitle: ['', [Validators.required], [this.productNameAsyncValidator()]],
      productDescription: ['', [Validators.required, Validators.minLength(3)]],
      productImage: ['', [Validators.required]],
      productPrice: ['', [Validators.required]]
    });

  }


  handleFormSubmit(): void {
    if (this.productFormGroup.valid) {
      const productFormValue = this.productFormGroup.value;
      const product: Product = {
        id: null,
        price: productFormValue.productPrice,
        description: productFormValue.productDescription,
        title: productFormValue.productTitle,
        image: productFormValue.productImage
      };
      this.formSubmitted = true;
      this.productAdministrationService.createProduct(product)
        .subscribe(response => {
            this.failedCreatingProduct = false;
            this.successfullyCreatedProduct = true;
          }, error => {
            this.failedCreatingProduct = true;
            this.successfullyCreatedProduct = false;
          }
        );
    }
  }

  resetForm(): void {
    this.formSubmitted = false;
    this.successfullyCreatedProduct = false;
    this.failedCreatingProduct = false;
    this.productFormGroup.reset();
  }

  productNameAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return control.valueChanges.pipe(
        debounceTime(300),
        switchMap(productTitle => this.productAdministrationService.getProductByProductName(productTitle).pipe(
          map(response => {
            if (response && response.length > 0) {
              return {productAlreadyCreated: true};
            } else {
              return null;
            }
          })
        )),
        catchError(err => {
          return of(null);
        }),
        first()
      );
    };
  }

}
