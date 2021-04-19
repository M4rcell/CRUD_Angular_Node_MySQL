import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../../../service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, Product } from '../../../../model/product.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent implements OnInit {

  
  loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();
  
  productForm!: FormGroup;

  subscription = new Subscription();
  
  category$!: Observable<Category[]>;

  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private productService: ProductService,

  ) { }

  ngOnInit(): void {

    this.initFormProduct();

    this.category$ = this.productService.getAllCategories().pipe(
      tap((res) => {
        return res;
      })
    );

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  initFormProduct(): void {
    this.productForm = this.fb.group({
      id: [this.data.id, Validators.required],
      product: [this.data.product, Validators.required],
      description: [this.data.description, Validators.required],
      codeCate: [this.data.codeCate, Validators.required],
      price: [this.data.price, Validators.required],
      state: [this.data.state, Validators.required],
    });
  }

  save(): void{
    try {

      if (this.data) {
        const resp = this.productService.updatProduct(
           this.data.id,
           this.productForm.value
          );
 
          console.log('resp : ', resp);
 
          this.subscription.add(
          resp.subscribe((batch) => {
            console.log('batch',batch)
            if (batch) {
             
              this.snackbar.open('✅ Se actualizo correctamente !', 'Aceptar', {
                duration: 6000,
              });
              this.dialogRef.close(false);               
            }
            else{
              this.snackbar.open(
                '🚨 Hubo un error al eliminar  !',  'Aceptar',
                {
                  duration: 6000,
                }
              );
            }
          })
        );
      }
    } catch (error) {
      console.log(error);
      this.loading.next(false);
    }
 

  }

}
