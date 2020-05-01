import { Component, OnInit } from "@angular/core";
import { OrderService } from "../service/order.service";
import { Order } from "../model/order";
import { Cart } from "../model/cart";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"],
})
export class OrderDetailsComponent implements OnInit {
  private order: Order[];
  private cart: Cart[];
  private errorMessage: string;
  private totalPrice: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.viewOrderDetails();
  }

  /**
   * this function for setting buy product in order details for checking
   * order is dispatched, dileverd,
   */
  private viewOrderDetails() {
    let userInfo: { email: string; token: string } = JSON.parse(
      localStorage.getItem("currentUser")
    );
    this.orderService.viewOrderDetails(userInfo.email).subscribe(
      (data) => {
        this.order = data;
        this.order.forEach((orderItem) => {
          // for every order id get order product
          this.orderService.viewOrderCart(orderItem.orderId).subscribe(
            (data) => {
              this.cart = data;
              let deliveryDate = new Date(orderItem.orderDate);
              deliveryDate.setDate(deliveryDate.getDate() + 8);
              // set total price and image into the order product
              this.cart.forEach((crt) => {
                this.totalPrice += crt.product.price;
                crt.product.imageUrl = `assets/imgecom/${crt.product.productId}.jpg`;
              });
              orderItem.totalPrice = this.totalPrice;
              orderItem.cart = this.cart;
              orderItem.deliveryDate = deliveryDate.toDateString();
              this.totalPrice = 0;
              console.log(orderItem);
            },
            (err) => {
              this.errorMessage = err.error.message;
            }
          );
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cancleOrder(orderId: string) {
    this.orderService.cancleOrder(orderId).subscribe(
      (response: { message: string }) => {
        console.log(response);
        alert(response.message);
        this.viewOrderDetails();
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    );
  }
}
