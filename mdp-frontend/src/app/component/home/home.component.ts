import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AddProductDialogComponent } from './dialogs/add-product-dialog/add-product-dialog.component';
import { DeleteProductDialogComponent } from './dialogs/delete-product-dialog/delete-product-dialog.component';
import { EditProductDialogComponent } from './dialogs/edit-product-dialog/edit-product-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { take, tap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  loading = new BehaviorSubject<boolean>(true);
  loading$ = this.loading.asObservable();

  productDataSource = new MatTableDataSource<any>();
  productDisplayedColumns: string[] = [
    'codePro',
    'product',
    'description',
    'codeCate',
    'price',
    'state',
    'actions',
  ];
  @ViewChild('ProductPaginator', { static: false }) set content(
    paginator: MatPaginator
  ) {
    this.productDataSource.paginator = paginator;
  }

  subscription = new Subscription();

  product$!: Observable<Product[]>;
  

  constructor(
    public dialog: MatDialog,    
    private snackbar: MatSnackBar,
    private productService: ProductService,

  ) { }

  ngOnInit(): void {
    
    this.updateProduct();
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  updateProduct(): void{
    this.product$ = this.productService.getAllProducts().pipe(
      tap((res) => {
        this.productDataSource.data = res;
         return res;
      })
    );
  }

  addProduct():void{
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      maxWidth: 500,
      width: '90vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateProduct();
    });

  }

  editDialog(item: any): void{
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      maxWidth: 500,
      width: '90vw',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateProduct();
    });
  }

  deleteDialog(item: any): void{
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      maxWidth: 500,
      width: '90vw',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateProduct();
    });

  }


}
