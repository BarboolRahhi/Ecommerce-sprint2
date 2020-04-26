import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { Product } from '../model/product';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.css']
})
export class HomeItemComponent implements OnInit {

  private categories: Category[];
  private products: Product[];

  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit() {
    this.categoryService.viewCategories().subscribe((data)=>{
      this.categories = data;
    });

    this.productService.viewProductsByCat(101).subscribe((data)=>{
      this.products = data;
    }); 
  }

}
