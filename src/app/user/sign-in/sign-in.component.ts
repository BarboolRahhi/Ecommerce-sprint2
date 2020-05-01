import { Component, OnInit, ViewChild } from "@angular/core";
import { CustomerUserService } from "src/app/service/customer-user.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  @ViewChild("f") logInForm: NgForm;
  error: string;

  constructor(private service: CustomerUserService, private router: Router) {}

  ngOnInit() {}

  signIn() {
    console.log(this.logInForm.value);
    this.service.login(this.logInForm.value).subscribe(
      (res) => {
        console.log(res.status);
        this.router.navigateByUrl("home");
      },
      (err) => {
        console.log(err.status);
        if (err.status === 401) this.error = "You are Unauthorized";
      }
    );
  }
}
