import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { Pet } from '../models/pet.model';

@Component({
  selector: 'app-pet-summary',
  standalone: true,
  template: `
    <div>
      <h3>Summary</h3>
      <p>Total Pets: {{ totalPets }}</p>
      <p>Favorite Pets: {{ favoritePets }}</p>
    </div>
  `
})
export class PetSummaryComponent implements OnInit {
  totalPets: number = 0;
  favoritePets: number = 0;

  constructor(private petService: PetService) {}

  ngOnInit() : void {
    this.petService.pets$.subscribe((data: Pet[]) => {
      this.totalPets = data.length;
      this.favoritePets = data.filter(pet => pet.isFavorite).length;
    });
  }
}
