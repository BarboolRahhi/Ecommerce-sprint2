import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CustomerUserService } from "../service/customer-user.service";
import { Router } from "@angular/router";
import { Address } from "../model/address";
import { User } from "../model/user";
import { OrderService } from "../service/order.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  @ViewChild("addressForm") addressForm: NgForm;
  private successMessage: string;
  private addresses: Address[];
  private errorMessage: string;
  private userInfo: { email: string; token: string };
  private userName: string;
  private email: string;

  constructor(
    private userService: CustomerUserService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    //get user information from local storage
    this.userInfo = JSON.parse(localStorage.getItem("currentUser"));

    if (this.userInfo != null) {
      this.userService
        .getUser(this.userInfo.email)
        .subscribe(
          (user: { firstName: string; lastName: string; email: string }) => {
            this.userName = user.firstName + " " + user.lastName;
            this.email = user.email;
            console.log(user);
          }
        );

      this.getAllUserAddresses();
    }
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

  addAddress() {
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
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeAddress(addressId: number) {
    this.orderService
      .viewOrderDetails(this.userInfo.email)
      .subscribe((data) => {
        data.forEach((order) => {
          if (order.address.addressId === addressId) {
            alert(
              "You cannoot delete this address because it used in delivery address"
            );
            return;
          }

          this.userService.deleteAddress(addressId).subscribe(
            (response: { message: string }) => {
              console.log(response);
              alert(response.message);
              this.getAllUserAddresses();
            },
            (err) => {
              console.log(err);
            }
          );
        });
      });
  }
}
