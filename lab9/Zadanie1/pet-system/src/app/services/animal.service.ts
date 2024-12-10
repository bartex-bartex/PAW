import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private animalsSubject: BehaviorSubject<Animal[]> = new BehaviorSubject<Animal[]>([]);
  public animals$: Observable<Animal[]> = this.animalsSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Pobieranie wszystkich zwierząt
  retrieveAnimals(): void {
    this.http.get<Animal[]>(this.apiUrl).subscribe(animal => this.animalsSubject.next(animal));
  }

  // Dodawanie nowego zwierzęcia
  addAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, animal).pipe(
      tap(() => this.retrieveAnimals())
    );
  }

  // Usuwanie zwierzęcia
  deleteAnimal(id: string): Observable<Animal> {
    return this.http.delete<Animal>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.retrieveAnimals())
    );
  }

  // Edytowanie zwierzęcia
  editAnimal(id: string, updatedAnimal: Animal): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiUrl}/${id}`, updatedAnimal).pipe(
      tap(() => this.retrieveAnimals())
    );
  }
}
