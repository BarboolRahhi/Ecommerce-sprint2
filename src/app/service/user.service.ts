import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { UserSignIn } from "../model/user-signin";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  isAuthorized(allowedRoles: string): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null) {
      return true;
    }

    // get token from local storage or state management
    let userInfo: { userId: number; token: string } = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (userInfo == null) return false;

    // decode token to read the payload details
    const decodeToken = "";

    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodeToken) {
      console.log("Invalid token");
      return false;
    }

    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(decodeToken["role"]);
  }

  public login(user: UserSignIn) {
    console.log("login send");
    return this.http
      .post("http://localhost:8083/login", user, { observe: "response" })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user.body));
          return user;
        })
      );
  }

  public getUser() {
    let userInfo: { userId: number; token: string } = JSON.parse(
      localStorage.getItem("currentUser")
    );
    return this.http.get("http://localhost:8083/users/" + userInfo.userId);
  }

  public logout() {
    localStorage.removeItem("currentUser");
  }
}
