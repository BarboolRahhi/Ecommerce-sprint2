import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService } from "../service/cart.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { CustomerUserService } from "../service/customer-user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private cartCount: number = 0;
  private cartCountState: boolean = false;
  private subscription: Subscription;
  private searchQuery: string;
  private userInfo: { email: string; token: string };
  private isLogin: boolean = false;
  private userName: string;

  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: CustomerUserService
  ) {}

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("currentUser"));

    if (this.userInfo != null) {
      this.isLogin = true;

      this.userService
        .getUser(this.userInfo.email)
        .subscribe((user: { firstName: string; lastName: string }) => {
          this.userName = user.firstName + " " + user.lastName;
        });

      /**
       * get initial count of cart item and set in header cart
       */
      this.cartService.viewCart(this.userInfo.email).subscribe((data) => {
        this.cartService.setCartItemCount(data.length);
      });
    }

    this.subscription = this.cartService
      .getCartItemCount()
      .subscribe((data) => {
        this.cartCount = data;
      });
  }

  /**
   * this method is used for searching and route to product/list
   * page pass query param as search info provided by user
   */
  search() {
    if (this.searchQuery == null) alert("Please add a search query");
    this.router.navigate(["/product/list"], {
      queryParams: { q: this.searchQuery },
    });
  }

  logOut() {
    this.userService.logout();
    this.isLogin = false;
    this.cartService.setCartItemCount(0);
    this.router.navigateByUrl("/home");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
