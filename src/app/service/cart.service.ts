import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private baseUrl = "http://localhost:8088/cart/";
  constructor(private http: HttpClient) {}

  public addToCart(pid: number, email: string) {
    return this.http.post(this.baseUrl + "addCart/" + pid + "/" + email, "");
  }
}
