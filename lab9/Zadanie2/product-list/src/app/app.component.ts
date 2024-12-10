import { Component, OnInit } from '@angular/core';
import { Products, Product, ProductService } from './services/product.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  data: Products = {};

  expandedCategories: Set<string> = new Set(); // Tracks expanded categories
  selectedCategories: Set<string> = new Set(); // Tracks selected categories
  selectedProducts: Set<string> = new Set(); // Tracks selected products
  
  constructor(private productService: ProductService) { }

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
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
  }

  toggleProductSelection(product: string): void {
    if (this.selectedProducts.has(product)) {
      this.selectedProducts.delete(product);
    } else {
      this.selectedProducts.add(product);
    }
  }

  isCategoryExpanded(category: string): boolean {
    return this.expandedCategories.has(category);
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategories.has(category);
  }

  isProductSelected(product: string): boolean {
    return this.selectedProducts.has(product);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((json) => {
      // console.log(JSON.stringify(data));
      // console.log(data["sweets"]);
      this.data = json;
      console.log(Object.keys(this.data));
      // console.log(this.products["Sweets"].length);
    });
  }
}
