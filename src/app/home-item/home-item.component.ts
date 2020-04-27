import { Component, OnInit } from "@angular/core";
import { Category } from "../model/category";
import { CategoryService } from "../service/category.service";
import { Product } from "../model/product";
import { ProductService } from "../service/product.service";
import { Router } from "@angular/router";
import { query } from "@angular/core/src/render3";

@Component({
  selector: "app-home-item",
  templateUrl: "./home-item.component.html",
  styleUrls: ["./home-item.component.css"],
})
export class HomeItemComponent implements OnInit {
  private categories: Category[];
  private products: Product[];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    this.productService.viewProductsByCat(101).subscribe((data) => {
      this.products = data;
    });
  }

  showCategoryItem(category: Category) {
    this.router.navigate(["/product/list"], {
      queryParams: { cid: category.categoryId, cname: category.categoryName },
    });
  }
}
