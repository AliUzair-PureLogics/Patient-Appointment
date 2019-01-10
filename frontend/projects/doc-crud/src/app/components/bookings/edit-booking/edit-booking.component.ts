import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  paramsSubscription: Params;
  booking: any;
  title = 'Edit Booking';
  addForm: FormGroup;
  updatedPatientName: string;
  updatedAppointmentTime: any;

  constructor(private route: ActivatedRoute,
              private service: UserService,
              private router: Router) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params
    .subscribe(
      (params: Params) => {
        this.booking = this.service.editBooking(+params['id']);
        // console.log(this.booking);
      }
    );

    this.addForm = new FormGroup({
      "patientName": new FormControl(this.booking.patientName, Validators.required),
      "appointmentTime": new FormControl(this.booking.appointmentTime, Validators.required),
      
    });


    this.updatedPatientName = this.addForm.value.patientName;
    // console.log(this.updatedPatientName);
    this.updatedAppointmentTime = this.addForm.value.appointmentTime;
    
  }

  onUpdate() {
    console.log(this.addForm.value);
    this.booking = this.route.params
        .subscribe(
          params => {
          this.service.updateBooking(this.addForm.value.patientName, this.addForm.value.appointmentTime, +params['id']);
          this.router.navigate(['bookings']);
          }
        );
    // console.log(this.booking);
  }
  
  
  
  

}
