import { Component, OnInit } from "@angular/core";
import { CartService } from "../service/cart.service";
import { Cart } from "../model/cart";
import { Product } from "../model/product";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  private cart: Cart[];
  private errorMessage: string;
  private totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.viewToCart();
  }

  private viewToCart() {
    this.cartService.viewCart("abc1@test.com").subscribe(
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
}
