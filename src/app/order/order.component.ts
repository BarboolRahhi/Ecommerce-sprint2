import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { OrderService } from "../service/order.service";
import { Cart } from "../model/cart";
import { CartService } from "../service/cart.service";
import { CustomerUserService } from "../service/customer-user.service";
import { Address } from "../model/address";
import { User } from "../model/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  @ViewChild("addressForm") addressForm: NgForm;
  private successMessage: string;
  private cart: Cart[];
  private addresses: Address[];
  private totalPrice: number = 0;
  private errorMessage: string;
  private userInfo: { email: string; token: string };
  private active: number;
  private deliveryAddress: Address;
  private isOrderPlaced: boolean = false;
  private isSavingAddress: boolean = false;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private userService: CustomerUserService,
    private router: Router
  ) {}

  ngOnInit() {
    //get user information from local storage
    this.userInfo = JSON.parse(localStorage.getItem("currentUser"));

    // this call is used to get total price and item in cart
    this.cartService.viewCart(this.userInfo.email).subscribe(
      (data) => {
        this.cart = data;
        this.cart.forEach((crt) => {
          this.totalPrice += crt.product.price;
        });
      },
      (err) => {
        console.log(err.error.message);
        this.cart = [];
      }
    );

    this.getAllUserAddresses();
  }

  getAllUserAddresses() {
    // show addres to user
    this.userService.getAllUserAddress(this.userInfo.email).subscribe(
      (data) => {
        this.addresses = data;
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  setAddressToOrder(index: number, address: Address) {
    this.active = index;
    this.deliveryAddress = address;
  }

  addAddress() {
    this.isSavingAddress = true;
    let formAddress = this.addressForm.value;
    let user = new User(this.userInfo.email);
    let address = new Address(
      formAddress["mobileNumber"],
      formAddress["pinCode"],
      formAddress["city"],
      formAddress["state"],
      formAddress["area"],
      user
    );
    console.log(formAddress);
    console.log(address);

    this.userService.addAddress(address).subscribe(
      (response) => {
        console.log(response);
        alert("Your New Addres is Saved");
        this.addressForm.reset();
        this.getAllUserAddresses();
        this.isSavingAddress = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addOrder() {
    if (this.deliveryAddress != null)
      this.orderService
        .addOrder(this.userInfo.email, this.deliveryAddress)
        .subscribe(
          (response: { message: string }) => {
            console.log(response);
            this.isOrderPlaced = true;
            this.successMessage = response.message;
            this.cartService.setCartItemCount(0);
          },
          (err) => {
            console.log(err);
            this.isOrderPlaced = false;
          }
        );
    else alert("Please select your delivery addres");
  }

  goToOrderDetails() {
    this.router.navigateByUrl("/order/details");
    this.orderService.isBuying = false;
  }
}
