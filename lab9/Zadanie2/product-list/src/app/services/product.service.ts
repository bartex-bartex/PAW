import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Updated import for Angular 19
import { Observable } from 'rxjs';

export interface Products {
  [category: string]: Product[];
}

export interface Product {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    console.log('Fetching products from API');
    return this.http.get<any>(this.apiUrl);
  }
}
