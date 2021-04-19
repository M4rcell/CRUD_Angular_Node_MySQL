import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './component/home/home.component';
import { MaterialModule } from './material/material.module';
import { AddProductDialogComponent } from './component/home/dialogs/add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from './component/home/dialogs/edit-product-dialog/edit-product-dialog.component';
import { DeleteProductDialogComponent } from './component/home/dialogs/delete-product-dialog/delete-product-dialog.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddProductDialogComponent,
    EditProductDialogComponent,
    DeleteProductDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
