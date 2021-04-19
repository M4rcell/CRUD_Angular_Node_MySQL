import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../../service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../../model/product.model';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.scss']
})
export class DeleteProductDialogComponent implements OnInit {

  loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<DeleteProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductService,
    private snackbar: MatSnackBar,

  ) { }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save(): void{
    try {

     if (this.data) {
       const resp = this.productService.deletProduct(
          this.data.id
         );

         console.log('resp : ', resp);

         this.subscription.add(
         resp.subscribe((batch) => {
           console.log('batch',batch)
           if (batch) {
           
            this.snackbar.open('✅ Se borro correctamente !', 'Aceptar', {
              duration: 6000,
            });
            this.dialogRef.close();
            
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

