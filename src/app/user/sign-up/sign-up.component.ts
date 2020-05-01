import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CustomerUserService } from "src/app/service/customer-user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  @ViewChild("f") signUpForm: NgForm;
  error: string;

  constructor(private service: CustomerUserService, private router: Router) {}

  ngOnInit() {}

  signUp() {
    this.service.createNewAccount(this.signUpForm.value).subscribe(
      (response) => {
        console.log(response);

        if (response != null) {
          alert("Your Account is Successfully created, Go to Login!");
          this.router.navigateByUrl("/user/signin");
        }
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }
}
