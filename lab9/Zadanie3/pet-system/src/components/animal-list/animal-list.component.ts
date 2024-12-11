import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalService, Animal } from '../../services/animal.service';
import { CategoryService, Category } from '../../services/category.service';


import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  animals: Animal[] = [];
  categories: Category[] = [];
  selectedCategories: string[] = [];
  editAnimal: Animal | null = null;
  newAnimal: Animal | null = null;
  newCategoryName: string = '';
  filterVisible: boolean = false;

  totalAnimals: number = 0;
  favoriteAnimals: number = 0;

  constructor(
    private animalService: AnimalService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    // load animals
    this.animalService.animals$.subscribe((animals: Animal[]) => {
      this.animals = animals;
      this.totalAnimals = animals.length;
      this.favoriteAnimals = animals.filter(animal => animal.favorite).length;
    });

    // load categories
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  deleteAnimal(id: string): void {
    this.animalService.deleteAnimal(id).subscribe();
  }

  startEdit(animal: Animal): void {
    this.editAnimal = { ...animal };
  }

  saveEdit(): void {
    if (this.editAnimal) {
      this.animalService.updateAnimal(this.editAnimal).subscribe(() => {
        this.editAnimal = null;
      });
    }
  }

  
  cancelAdd(): void {
    this.newAnimal = null;
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  }

  toggleFavorite(animal: Animal): void {
    animal.favorite = !animal.favorite;
    this.animalService.updateAnimal(animal).subscribe();
  }

  cancelEdit(): void {
    this.editAnimal = null;
  }

  startAdd(): void {
    this.newAnimal = { id: '', name: '', favorite: false, category: '', age: 0, weight: 0, favoriteFood: '' };
  }

  canToggleFavorite(animal: Animal): boolean {
    return true;
  }

  onCategoryChange(categoryId: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedCategories.push(categoryId);
    } else {
      const index = this.selectedCategories.indexOf(categoryId);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
  }
  
  addAnimal(): void {
    if (this.newAnimal) {
      this.newAnimal.id = this.nextId(this.animals);
      this.animalService.addAnimal(this.newAnimal).subscribe(() => {
        this.newAnimal = null;
      });
    }
  }
  
  getFilteredAnimals(): Animal[] {
    if (this.selectedCategories.length === 0) {
      return this.animals;
    }
    return this.animals.filter(animal => this.selectedCategories.includes(animal.category));
  }

  toggleFilterVisibility(): void {
    this.filterVisible = !this.filterVisible;
  }

  nextId(collection: Animal[] | Category[]): string {
    return collection.length > 0 ? (Math.max(...collection.map(a => parseInt(a.id))) + 1).toString() : '1';
  }

  addCategory(): void {
    if (this.newCategoryName) {
      const newCategory: Category = {
        id: this.nextId(this.categories),
        name: this.newCategoryName,
      };
      this.categoryService.addCategory(newCategory).subscribe(() => {
        this.newCategoryName = '';
      });
    }
  }
}
