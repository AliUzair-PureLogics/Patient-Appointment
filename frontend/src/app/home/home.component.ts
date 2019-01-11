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
  doctorList = [];
  doctorSlots = [];
  isLoadingAppointments = true;
  isLoadingSlots = false;
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
  displayedColumns: string[] = [
    'availabilityDay',
    'availabilityDateFormatted',
    'availabilityTime',
    'doctorId'
  ];
  constructor(private userService: DataService, private router: Router) {}

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      res => (this.isAuthenticated = res)
    );
    if (!this.isAuthenticated) {
      // redirect to login
      this.router.navigate(["login"]);
    } else {
      this.loadAppointments();
      this.loadDoctors();
    }
  }

  loadAppointments() {
    this.isLoadingAppointments = true;
    this.userService.loadAppointments().subscribe(
      res => {
        this.isLoadingAppointments = false;
        this.apponitments.upcoming = res["upcoming"];
        this.apponitments.previous = res["previous"];
      },
      err => {
        this.isLoadingAppointments = false;
        console.log(err);
      }
    );
  }

  loadDoctors() {
    this.userService.loadDoctors().subscribe(
      res => {
        this.doctorList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getDoctorSlots(doctorId) {
    this.isLoadingSlots = true;
    this.doctorSlots = [];
    this.appointment.availabilityDate = "";
    this.userService.loadDoctorSlots(doctorId).subscribe(
      res => {
        this.isLoadingSlots = false;
        this.doctorSlots = res;
      },
      err => {
        this.isLoadingSlots = false;
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
    if (!this.appointment.availabilityDate) {
      return alert("Please select Available slot");
    }
    this.userService.submitAppointment(this.appointment).subscribe(
      res => {
        this.loadAppointments();
        alert("Appointment has been created");
      },
      err => {
        console.log(err);
      }
    );
  }
}
