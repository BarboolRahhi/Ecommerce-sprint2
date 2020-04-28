import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService } from "../service/cart.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

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

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.viewCart("abc1@test.com").subscribe((data) => {
      this.cartService.setCartItemCount(data.length);
    });

    this.subscription = this.cartService
      .getCartItemCount()
      .subscribe((data) => {
        this.cartCount = data;
      });
  }

  search() {
    if (this.searchQuery == null) alert("Please add a search query");
    this.router.navigate(["/product/list"], {
      queryParams: { q: this.searchQuery },
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
