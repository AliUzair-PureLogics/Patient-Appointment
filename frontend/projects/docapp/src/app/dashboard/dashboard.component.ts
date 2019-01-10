import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../global.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  private userData = JSON.parse(localStorage.getItem("data"));

  create = false;

  days = [
    { name: "Mon", check: false },
    { name: "Tue", check: false },
    { name: "Wed", check: false },
    { name: "Thur", check: false },
    { name: "Fri", check: false },
    { name: "Sat", check: false },
    { name: "Sun", check: false }
  ];

  slots = [];

  hours;
  time;

  constructor(private service: GlobalService) {}

  ngOnInit() {
    this.service.getDoctorSlots().subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

  createSlots() {
    const days = this.days.filter(o => o.check === true).map(o => o.name);

    const data = {
      availabilityDays: days,
      availabilityHours: this.hours,
      userId: this.userData.id,
      availabilityTime: this.time
    };
    this.service.createDoctorSlots(data).subscribe(
      res => {
        alert("Slot Created");
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
