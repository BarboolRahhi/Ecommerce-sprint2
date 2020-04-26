import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  public viewCategories():Observable<any> {
    return this.http.get("http://localhost:8082/springrest/viewcat")
  }

}
