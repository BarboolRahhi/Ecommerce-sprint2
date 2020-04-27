import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/model/category";
import { Product } from "src/app/model/product";
import { CategoryService } from "src/app/service/category.service";
import { ProductService } from "src/app/service/product.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  private categories: Category;
  private products: Product[];
  private categoryId: number;
  private categoryName: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.categoryId = +param["cid"];
      this.categoryName = param["cname"];
      this.viewProductByCategoryId(this.categoryId);
    });
  }

  viewProductByCategoryId(cid: number) {
    this.productService.viewProductsByCat(cid).subscribe((data) => {
      this.products = data;
    });
  }

  showProductDetails(pid: number) {
    this.router.navigate(["/product/details"], { queryParams: { pid: pid } });
  }
}
