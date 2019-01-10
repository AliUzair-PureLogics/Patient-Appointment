import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../global.service";
import { Router, Route } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";

  constructor(private service: GlobalService, private router: Router) {}

  ngOnInit() {}

  login() {
    const data = {
      username: this.username,
      password: this.password
    };
    this.service.login(data).subscribe(
      (res: any) => {
        this.username = "";
        this.password = "";
        localStorage.setItem("token", res.token);
        localStorage.setItem("data", JSON.stringify(res.data));
        alert(res.message);
        this.router.navigate(["dashboard"]);
      },
      err => alert(err.error.message)
    );
  }
}
