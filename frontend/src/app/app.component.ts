import { Component, OnInit } from "@angular/core";
import { DataService } from "./data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "app";
  isAuthenticated;
  constructor(private router: Router, private userService: DataService) {}
  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      res => (this.isAuthenticated = res)
    );
  }

  doLogout() {
    this.userService.doLogout();
    this.router.navigate(["login"]);
  }
}
