import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Order } from "../model/order";
import { Cart } from "../model/cart";
import { Address } from "../model/address";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  public isBuying: boolean = false;
  private baseUrl = "http://localhost:8088/order/";
  private baseUrlCart = "http://localhost:8088/cart/";
  constructor(private http: HttpClient) {}

  public addOrder(email: string, address: Address) {
    return this.http.post(this.baseUrlCart + "addOrder/" + email, address);
  }

  public viewOrderDetails(email: string) {
    return this.http.get<Order[]>(this.baseUrl + "viewOrder/" + email);
  }

  public viewOrderCart(orderId: string) {
    return this.http.get<Cart[]>(
      this.baseUrl + "viewProductsInOrder/" + orderId
    );
  }

  public cancleOrder(orderId: string) {
    return this.http.put(this.baseUrl + "cancelOrder/" + orderId, "");
  }
}
