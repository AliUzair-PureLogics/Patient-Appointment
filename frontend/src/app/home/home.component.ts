import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  isAuthenticated;
  constructor(private userService: DataService, private router: Router) {}

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      res => (this.isAuthenticated = res)
    );
    if (!this.isAuthenticated) {
      // redirect to login
      this.router.navigate(['login']);
    }
  }

  doLogout() {
    this.userService.doLogout();
    this.router.navigate(['login']);
  }
}
