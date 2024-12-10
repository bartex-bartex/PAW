import { Component, OnInit } from '@angular/core';
import { Products, Product, ProductService } from './services/product.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed typo (from 'styleUrl' to 'styleUrls')
})
export class AppComponent implements OnInit {
  data: Products = {};

  expandedCategories: Set<string> = new Set(); // Tracks expanded categories
  selectedCategories: Set<string> = new Set(); // Tracks selected categories
  selectedProducts: { [category: string]: Set<string> } = {}; // Tracks selected products by category
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((json) => {
      this.data = json;
      // Initialize selected products per category
      Object.keys(this.data).forEach(category => {
        this.selectedProducts[category] = new Set();
      });
    });
  }

  categories(): string[] {
    return Object.keys(this.data);
  }

  products(category: string): string[] {
    return this.data[category].map((product) => product.name);
  }
  
  toggleCategoryExpansion(category: string): void {
    if (this.expandedCategories.has(category)) {
      this.expandedCategories.delete(category);
    } else {
      this.expandedCategories.add(category);
    }
  }

  toggleCategorySelection(category: string): void {
    if (this.expandedCategories.has(category)) {
      return; // Don't allow toggling if category is expanded
    }

    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
      this.selectedProducts[category].clear();
    } else {
      this.selectedCategories.add(category);
      // Select all products within that category
      this.selectedProducts[category] = new Set(this.products(category));
    }
  }

  toggleProductSelection(category: string, product: string): void {
    if (this.selectedProducts[category].has(product)) {
      this.selectedProducts[category].delete(product);
    } else {
      this.selectedProducts[category].add(product);
    }

    // If all products are selected, select the category
    if (this.selectedProducts[category].size === this.products(category).length) {
      this.selectedCategories.add(category);
    } else {
      this.selectedCategories.delete(category);
    }
  }

  isCategoryExpanded(category: string): boolean {
    return this.expandedCategories.has(category);
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategories.has(category);
  }

  isProductSelected(category: string, product: string): boolean {
    return this.selectedProducts[category]?.has(product);
  }
}
