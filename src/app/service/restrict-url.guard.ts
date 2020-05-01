import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { OrderService } from "./order.service";

@Injectable({
  providedIn: "root",
})
export class RestrictUrlGuard implements CanActivate {
  constructor(private orderService: OrderService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.orderService.isBuying) {
      window.alert("You cannot visit this Page");
      this.router.navigate(["/home"]);
    }
    return true;
  }
}
