import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { UserSignIn } from "../model/user-signin";
import { UserSignUp } from "../model/user-signup";
import { Address } from "../model/address";

@Injectable({
  providedIn: "root",
})
export class CustomerUserService {
  constructor(private http: HttpClient) {}

  private baseUrl = "http://localhost:8083/users/";

  isAuthorized(allowedRoles: string): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null) {
      return true;
    }

    // get token from local storage or state management
    let userInfo: { email: string; token: string } = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (userInfo == null) return false;

    // decode token to read the payload details
    const decodeToken = jwt_decode(userInfo.token);

    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodeToken) {
      console.log("Invalid token");
      return false;
    }
    //  ROLE_ADMIN -> routing == ROLE_USER -> token
    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(decodeToken["role"]);
  }

  public login(user: UserSignIn) {
    return this.http
      .post(this.baseUrl + "login", user, { observe: "response" })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user.body));
          return user;
        })
      );
  }

  public getUser(email: string) {
    return this.http.get(this.baseUrl + email);
  }

  public createNewAccount(userSignUp: UserSignUp) {
    return this.http.post(this.baseUrl + "signup", userSignUp);
  }

  public addAddress(address: Address) {
    return this.http.post(this.baseUrl + "address", address);
  }

  public getAllUserAddress(email: string) {
    return this.http.get<Address[]>(this.baseUrl + "address/" + email);
  }

  public deleteAddress(addressId: number) {
    return this.http.delete(this.baseUrl + "address/" + addressId);
  }

  public logout() {
    localStorage.removeItem("currentUser");
  }
}
