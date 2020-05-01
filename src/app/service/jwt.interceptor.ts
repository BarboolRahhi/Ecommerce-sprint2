import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CustomerUserService } from "./customer-user.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let userInfo: { userId: number; token: string } = JSON.parse(
      localStorage.getItem("currentUser")
    );
    if (userInfo && userInfo.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
