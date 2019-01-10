import { Component, OnInit } from "@angular/core";
import { UserService } from "../../user.service";

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.component.html",
  styleUrls: ["./doctors.component.css"]
})
export class DoctorsComponent implements OnInit {
  users = [];

  constructor(private service: UserService) {}

  ngOnInit() {
    this.service.viewDoctors().subscribe(
      (response: any) => {
        // console.log(response);
        this.users = response;
      },
      error => console.log(error)
    );
  }

  deleteUser(id) {
    this.service.deleteUser(id).subscribe(
      res => {
        this.users = this.users.filter(data => {
          return data._id !== id;
        });
      },
      error => console.log(error)
    );
  }
}
