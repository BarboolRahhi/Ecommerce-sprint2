import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { CustomerUserService } from "./customer-user.service";

@Injectable({
  providedIn: "root",
})
export class CustomerAuthorizationGuard implements CanActivate {
  constructor(
    private authorizationService: CustomerUserService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);

    if (!isAuthorized) {
      window.alert("You cannot visit this page without login");
      //this.router.navigate(["/user/signin"]);
      this.router.navigate(["/user/signin"], {
        queryParams: { returnUrl: state.url },
      });
    }
    return true;
  }
}
