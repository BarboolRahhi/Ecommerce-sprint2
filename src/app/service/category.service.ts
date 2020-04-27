import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../model/category";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private baseUrl = "http://localhost:8088/viewcat";
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<any> {
    return this.http.get<Category[]>(this.baseUrl);
  }
}
