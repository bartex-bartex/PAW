import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import child components
import { PetSummaryComponent } from './summary/summary.component'; 
import { PetListComponent } from './components/pet-list/pet-list.component'; 
import { PetFormComponent } from './components/pet-form/pet-form.component';

@Component({
  selector: 'app-root',
  standalone: true,  // Marks this as a standalone component
  template: `
    <h1>Animal Management System</h1>
    
    <!-- Display the summary -->
    <app-pet-summary></app-pet-summary>
    
    <!-- Display the list of animals -->
    <app-pet-list></app-pet-list>
    
    <!-- Form to add or edit animals -->
    <app-pet-form></app-pet-form>
  `,
  imports: [
    CommonModule,
    FormsModule,
    PetSummaryComponent,
    PetListComponent,
    PetFormComponent  // Import all child components here
  ]
})
export class AppComponent {}
