import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Category } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>  {
    return this.http.get<Product[]>(`${this.API_URI}/products`);
  }
  getAllCategories(): Observable<Category[]>  {
    return this.http.get<Category[]>(`${this.API_URI}/products/category`);
  }

  geProduct(id: string) {
    return this.http.get(`${this.API_URI}/products/${id}`);
  }

  deletProduct(id: number) {
    return this.http.delete(`${this.API_URI}/products/${id}`);
  }

  saveProduct(game: Product) {
    return this.http.post(`${this.API_URI}/products`, game);
  }

  updatProduct(id: number, updatedGame: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URI}/products/${id}`, updatedGame);
  }
}
