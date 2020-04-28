import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/model/category";
import { Product } from "src/app/model/product";
import { CategoryService } from "src/app/service/category.service";
import { ProductService } from "src/app/service/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from "src/app/service/cart.service";

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
  private searchQuery: string;
  private query: string;
  private message: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.categoryId = +param["cid"];
      this.categoryName = param["cname"];
      this.searchQuery = param["q"];
      this.products = [];
      this.message = null;
      if (param["q"] != null) {
        this.query = this.searchQuery;
        this.viewProductBySearchQuery(this.searchQuery);
      }
      if (param["cid"] != null) {
        this.query = this.categoryName;
        this.viewProductByCategoryId(this.categoryId);
      }
    });
  }

  addToCart(pid: number) {
    this.cartService.addToCart(pid, "abc1@test.com").subscribe(
      (response) => {
        console.log(response);
        alert("Product is add to cart");
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }

  viewProductByCategoryId(cid: number) {
    this.productService.viewProductsByCat(cid).subscribe(
      (data) => {
        this.products = data;
        this.products.forEach((p) => {
          p.imageUrl = `assets/imgecom/${p.productId}.jpg`;
        });
      },
      (err) => {
        this.message = err.error.message;
      }
    );
  }

  viewProductBySearchQuery(query: string) {
    this.productService.searchProducts(query).subscribe(
      (data) => {
        this.products = data;
        this.products.forEach((p) => {
          p.imageUrl = `assets/imgecom/${p.productId}.jpg`;
        });
      },
      (err) => {
        this.message = err.error.message;
      }
    );
  }

  showProductDetails(pid: number) {
    this.router.navigate(["/product/details"], { queryParams: { pid: pid } });
  }
}
