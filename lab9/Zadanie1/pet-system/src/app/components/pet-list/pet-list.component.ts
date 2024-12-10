import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private petSevice: PetService) {}

  ngOnInit(): void {
    this.petSevice.pets$.subscribe((data: Pet[]) => this.pets = data);
  }
}
