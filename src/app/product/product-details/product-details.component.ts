import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/service/product.service";
import { Product } from "src/app/model/product";
import { ActivatedRoute } from "@angular/router";
import { ProductSpec } from "src/app/model/productspec";
import { Review } from "src/app/model/review";
import { CartService } from "src/app/service/cart.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  private product: Product;
  private productSpec: ProductSpec[];
  private productReview: Review[];
  private errorReviewMessage: string;
  private errorSpecMessage: string;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      let pid = +param["pid"];
      this.viewProductByProductId(pid);
      this.viewProductSpecByProductId(pid);
      this.viewProductReview(pid);
    });
  }

  addToCart(pid: number) {
    this.cartService
      .addToCart(this.product.productId, "abc1@test.com")
      .subscribe(
        (response) => {
          console.log(response);
        },
        (err) => {
          console.log(err.error.message);
        }
      );
  }

  viewProductByProductId(pid: number) {
    this.productService.viewProductById(pid).subscribe((data) => {
      this.product = data;
    });
  }

  viewProductSpecByProductId(pid: number) {
    this.productService.viewProductSpecById(pid).subscribe(
      (data) => {
        this.productSpec = data;
      },
      (err) => {
        this.errorSpecMessage = err.error.message;
      }
    );
  }

  viewProductReview(pid: number) {
    this.productService.viewProductReview(pid).subscribe(
      (data) => {
        this.productReview = data;
      },
      (err) => {
        this.errorReviewMessage = err.error.message;
      }
    );
  }
}
