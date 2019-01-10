import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../global.service";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  subscription: Subscription;

  name = "";
  username = "";
  password = "";

  constructor(private service: GlobalService) {}

  ngOnInit() {}

  Signup() {
    const data = {
      name: this.name,
      username: this.username,
      password: this.password,
      role: 3
    };

    this.subscription = this.service.signup(data).subscribe(
      (res: any) => {
        alert(res.message);
        this.name = "";
        this.username = "";
        this.password = "";
      },
      err => console.log(err)
    );
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
