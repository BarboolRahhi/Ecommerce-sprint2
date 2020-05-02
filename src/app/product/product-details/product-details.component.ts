import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ProductService } from "src/app/service/product.service";
import { Product } from "src/app/model/product";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductSpec } from "src/app/model/productspec";
import { Review } from "src/app/model/review";
import { CartService } from "src/app/service/cart.service";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { User } from "src/app/model/user";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild("reviewForm") reviewForm: NgForm;
  private product: Product;
  private productSpec: ProductSpec[];
  private productReview: Review[];
  private errorReviewMessage: string;
  private errorSpecMessage: string;
  private cartItemCount: number = 0;
  private inStock: boolean = true;
  private productId: number;
  private isAddedToCart: boolean = false;

  private userInfo: { email: string; token: string };

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("currentUser"));

    this.route.queryParams.subscribe((param) => {
      let pid = +param["pid"];
      this.productId = pid;
      this.viewProductByProductId(pid);
      this.viewProductSpecByProductId(pid);
      this.viewProductReview(pid);

      // get current cart item count
      this.cartService.viewCart(this.userInfo.email).subscribe((data) => {
        this.cartItemCount = data.length;
        console.log(this.cartItemCount);
      });
    });
  }

  buyNow(pid: number) {
    if (this.userInfo == null) {
      alert("You cannot buy without account");
      return;
    }

    if (!this.isAddedToCart) this.addToCart(pid);
    this.router.navigateByUrl("/cart");
  }

  addToCart(pid: number) {
    if (this.userInfo == null) {
      alert("You cannot Add item into cart without account");
      return;
    }
    this.cartService
      .addToCart(this.product.productId, this.userInfo.email)
      .subscribe(
        (response: { message: string }) => {
          console.log(response);
          this.isAddedToCart = true;
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
      if (this.product.quantity <= 0) this.inStock = false;
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
        this.errorReviewMessage = null;
      },
      (err) => {
        this.errorReviewMessage = err.error.message;
      }
    );
  }

  addReview() {
    let reviewFormValue = this.reviewForm.value;
    let user = new User(this.userInfo.email);
    let review = new Review(
      reviewFormValue["rating"],
      reviewFormValue["review"],
      new Date().toDateString(),
      user,
      this.product
    );
    this.productService.addReview(review).subscribe(
      (data) => {
        console.log(data);
        this.viewProductReview(this.productId);
        this.reviewForm.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
