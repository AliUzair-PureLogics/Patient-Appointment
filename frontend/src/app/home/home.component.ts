import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  isAuthenticated;
  activeTab = "list";
  doctorList = [];
  doctorSlots = [];
  apponitments = {
    upcoming: [],
    previous: []
  };
  appointment = {
    doctorId: "",
    availabilityDate: "",
    availabilityDay: "",
    availabilityTime: ""
  };
  constructor(private userService: DataService, private router: Router) {}

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      res => (this.isAuthenticated = res)
    );
    if (!this.isAuthenticated) {
      // redirect to login
      this.router.navigate(["login"]);
    }
    this.loadAppointments();
    this.loadDoctors();
  }

  doLogout() {
    this.userService.doLogout();
    this.router.navigate(["login"]);
  }

  loadAppointments() {
    this.userService.loadAppointments().subscribe(
      res => {
        console.log("Appointments: ", res);
        this.apponitments.upcoming = res["upcoming"];
        this.apponitments.previous = res["previous"];
      },
      err => {
        console.log(err);
      }
    );
  }

  loadDoctors() {
    this.userService.loadDoctors().subscribe(
      res => {
        console.log("doctors: ", res);
        this.doctorList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getDoctorSlots(doctorId) {
    this.doctorSlots = [];
    this.userService.loadDoctorSlots(doctorId).subscribe(
      res => {
        console.log("doctors slots: ", res);
        this.doctorSlots = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  onSlotSelectionChange(slot) {
    this.appointment.availabilityDay = slot.availabilityDay;
    this.appointment.availabilityTime = slot.availabilityTime;
    this.appointment.availabilityDate = slot.availabilityDate;
  }

  submitAppointment() {
    if (!this.appointment.doctorId) {
      return alert("Please select doctor");
    }
    if (!this.appointment.availabilityTime) {
      return alert("Please select Available slot");
    }
    this.userService.submitAppointment(this.appointment).subscribe(
      res => {
        this.loadAppointments();
        console.log("submitAppointment: ", res);
        alert("Appointment has been created");
      },
      err => {
        console.log(err);
      }
    );
  }
}
