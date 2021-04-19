import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product.service';
import { Category, Product } from '../../../../model/product.model';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {
  
  loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();
  
  productForm!: FormGroup;


  subscription = new Subscription();
  
  category$!: Observable<Category[]>;

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
      id: ['', Validators.required],
      product: ['', Validators.required],
      description: ['', Validators.required],
      codeCate: ['', Validators.required],
      price: ['', Validators.required],
      state: ['', Validators.required],
    });
  }
 
  save(): void{
    try {
      if (this.productForm.valid) {
        const resp = this.productService.saveProduct(
          this.productForm.value,
          );
          this.loading.next(true);
          console.log('resp : ', resp);

          this.subscription.add(
          resp.subscribe((batch) => {
            console.log('batch',batch)
            if (batch) {                         
              this.snackbar.open('✅ Se actualizo correctamente!', 'Aceptar', {
                duration: 6000,
              });
              this.loading.next(true);
              this.dialogRef.close(false);              
            }
            else{
              this.snackbar.open(
                '🚨 Hubo un error al actualizar  !',  'Aceptar',
                {
                  duration: 6000,
                }
              );
              this.loading.next(true);
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
