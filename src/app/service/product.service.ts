import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  public viewProductsByCat(cid:number):Observable<any> {
    return this.http.get("http://localhost:8082/springrest/viewprod/"+cid);
  }

}
