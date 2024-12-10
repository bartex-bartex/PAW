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
  
  constructor(private productService: ProductService) { }

  categories(): string[] {
    return Object.keys(this.data);
  }

  products(category: string): string[] {
    return this.data[category].map((product) => product.name);
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
