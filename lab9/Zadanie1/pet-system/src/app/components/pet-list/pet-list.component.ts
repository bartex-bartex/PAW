import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h3>Pet List</h3>
      <ul>
        <li *ngFor="let pet of pets">
          {{ pet.name }} ({{ pet.category }})
        </li>
      </ul>
    </div>
  `
})
export class PetListComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private petSevice: PetService) {}

  ngOnInit(): void {
    this.petSevice.pets$.subscribe((data: Pet[]) => this.pets = data);
  }
}
