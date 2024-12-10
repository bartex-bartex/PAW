import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {
  pet: Pet = {
    id: 0, // ID will be generated by the backend
    name: '', 
    isFavorite: false,
    category: '', // Optional, can be selected later
    age: 0, 
    weight: 0, 
    favoriteFood: '' // Optional, can be selected later
  };

  pets: Pet[] = [];  // Store the list of pets here

  constructor(private petService: PetService) {}

  ngOnInit() {
    // Load pets when the component is initialized
    this.loadPets();
  }

  // Method to load pets from the pet service (simulating an API call)
  loadPets() {
    this.petService.retrievePets()
  }

  // Submit form and send pet data to the service
  onSubmit() {
    // Check if all form fields are valid
    if (this.pet.name && this.pet.category && this.pet.age && this.pet.weight && this.pet.favoriteFood) {
      // All fields are valid, proceed with form submission
      console.log("Form submitted successfully:", this.pet);
      this.petService.addPet(this.pet).subscribe({
        next: (response) => {
          console.log('Pet added successfully:', response);
          // Reset form after submission
          this.pet = { id: 0, name: '', isFavorite: false, category: '', age: 0, weight: 0, favoriteFood: '' };
        },
        error: (err) => {
          console.error('Error adding pet:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  
}
