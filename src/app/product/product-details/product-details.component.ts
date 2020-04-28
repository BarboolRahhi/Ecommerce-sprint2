import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "src/app/service/product.service";
import { Product } from "src/app/model/product";
import { ActivatedRoute } from "@angular/router";
import { ProductSpec } from "src/app/model/productspec";
import { Review } from "src/app/model/review";
import { CartService } from "src/app/service/cart.service";
import { Subscription } from "rxjs";

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
  private cartItemCount: number = 0;

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

      // get current cart item count
      this.cartService.viewCart("abc1@test.com").subscribe((data) => {
        this.cartItemCount = data.length;
        console.log(this.cartItemCount);
      });
    });
  }

  addToCart(pid: number) {
    this.cartService
      .addToCart(this.product.productId, "abc1@test.com")
      .subscribe(
        (response: { message: string }) => {
          console.log(response);
          this.cartService.setCartItemCount(this.cartItemCount + 1);
          alert(response.message);
        },
        (err) => {
          console.log(err.error.message);
        }
      );
  }

  viewProductByProductId(pid: number) {
    this.productService.viewProductById(pid).subscribe((data) => {
      this.product = data;
      this.product.imageUrl = `assets/imgecom/${data.productId}.jpg`;
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
