import { Component, OnInit } from "@angular/core";
import { CartService } from "../service/cart.service";
import { Cart } from "../model/cart";
import { OrderService } from "../service/order.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  private cart: Cart[];
  private errorMessage: string;
  private totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.viewToCart();
  }

  private viewToCart() {
    let userInfo: { email: string; token: string } = JSON.parse(
      localStorage.getItem("currentUser")
    );
    this.cartService.viewCart(userInfo.email).subscribe(
      (data) => {
        this.cart = data;
        this.cart.forEach((crt) => {
          this.totalPrice += crt.product.price;
          crt.product.imageUrl = `assets/imgecom/${crt.product.productId}.jpg`;
        });

        this.cartService.setCartItemCount(this.cart.length);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.cart = [];
        this.cartService.setCartItemCount(this.cart.length);
      }
    );
  }

  removeToCart(cartId: number) {
    this.cartService.removeToCart(cartId).subscribe(
      (response) => {
        console.log(response);
        this.viewToCart();
        this.totalPrice = 0;
        alert("Cart Item Removed!");
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  proceedToBuy() {
    this.orderService.isBuying = true;
    this.router.navigateByUrl("/order");
  }
}
