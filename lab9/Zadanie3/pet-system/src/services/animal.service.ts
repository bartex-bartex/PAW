import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Animal {
  id: string;
  name: string;
  favorite: boolean;
  category: string;
  age: number;
  weight: number;
  favoriteFood: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private apiUrl = 'http://localhost:3000/animals';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private animalsSubject = new BehaviorSubject<Animal[]>([]);
  animals$ = this.animalsSubject.asObservable();


  constructor(private http: HttpClient) {
    this.loadAnimals();
  }

  loadAnimals(): void {
    this.http.get<Animal[]>(this.apiUrl).subscribe(animals => this.animalsSubject.next(animals));
  }



  deleteAnimal(id: string): Observable<Animal> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Animal>(url, this.httpOptions).pipe(
      tap(() => this.loadAnimals())
    );
  }

  updateAnimal(animal: Animal): Observable<Animal> {
    const url = `${this.apiUrl}/${animal.id}`;
    return this.http.put<Animal>(url, animal, this.httpOptions).pipe(
      tap(() => this.loadAnimals())
    );
  }

  addAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, animal, this.httpOptions).pipe(
      tap(() => this.loadAnimals())
    );
  }

}
