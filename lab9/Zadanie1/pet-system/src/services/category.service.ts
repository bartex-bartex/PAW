import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Category {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = 'http://localhost:3000/categories';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, this.httpOptions);
  }
}
