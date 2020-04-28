import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cart } from "../model/cart";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartCount = new Subject<number>();
  private count: number;
  private baseUrl = "http://localhost:8088/cart/";
  constructor(private http: HttpClient) {}

  public addToCart(pid: number, email: string) {
    return this.http.post(this.baseUrl + "addCart/" + pid + "/" + email, "");
  }

  public removeToCart(cartid: number) {
    return this.http.delete(this.baseUrl + "delete/" + cartid);
  }

  public viewCart(email: string) {
    return this.http.get<Cart[]>(this.baseUrl + "viewCart/" + email);
  }

  public setCartItemCount(count: number) {
    this.cartCount.next(count);
  }

  public getCartItemCount(): Observable<number> {
    return this.cartCount.asObservable();
  }
}
