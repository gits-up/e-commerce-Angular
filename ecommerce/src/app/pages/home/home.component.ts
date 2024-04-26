import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  productList: any[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.loadAllProducts();
  }
  
  loadAllProducts() {
    this.productService.getAllProducts().subscribe((result: any)=>{
      this.productList = result.data;
    })
  }
}
