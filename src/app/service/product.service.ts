import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../model/product";
import { ProductSpec } from "../model/productspec";
import { Review } from "../model/review";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public viewProductsByCat(cid: number): Observable<any> {
    return this.http.get<Product[]>("http://localhost:8088/viewprod/" + cid);
  }

  public viewProductById(pid: number): Observable<any> {
    return this.http.get<Product>("http://localhost:8088/viewprodbyid/" + pid);
  }

  public viewProductSpecById(pid: number): Observable<any> {
    return this.http.get<ProductSpec[]>(
      "http://localhost:8088/viewprodspec/" + pid
    );
  }

  public viewProductReview(pid: number): Observable<any> {
    return this.http.get<Review[]>(
      "http://localhost:8088/viewprodreview/" + pid
    );
  }

  public addReview(review: Review) {
    return this.http.post("http://localhost:8088/addReview", review);
  }

  public searchProducts(query: string): Observable<any> {
    return this.http.get<Product[]>("http://localhost:8088/search/" + query);
  }
}
