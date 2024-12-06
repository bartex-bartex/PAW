import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private apiUrl = 'http://localhost:3000/animals';
  private petsSubject: BehaviorSubject<Pet[]> = new BehaviorSubject<Pet[]>([]);
  public pets$: Observable<Pet[]> = this.petsSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Pobieranie wszystkich zwierząt
  retrievePets(): void {
    this.http.get<Pet[]>(this.apiUrl).subscribe(pet => this.petsSubject.next(pet));
  }

  // Dodawanie nowego zwierzęcia
  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet).pipe(
      tap(() => this.retrievePets())
    );
  }

  // Usuwanie zwierzęcia
  deletePet(id: number): Observable<Pet> {
    return this.http.delete<Pet>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.retrievePets())
    );
  }

  // Edytowanie zwierzęcia
  editPet(id: number, updatedPet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, updatedPet).pipe(
      tap(() => this.retrievePets())
    );
  }
}
