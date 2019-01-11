import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { DataService, Errors } from "../data.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errors: Errors = new Errors();
  authForm: FormGroup;
  isAuthenticated;
  isSubmitting = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: DataService
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      name: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      res => (this.isAuthenticated = res)
    );
    if (this.isAuthenticated) {
      // redirect to login
      this.router.navigate([""]);
    }
  }

  register() {
    this.isSubmitting = true;
    this.errors = new Errors();

    const credentials = this.authForm.value;
    this.userService.attemptAuth('register', credentials).subscribe(
      data => {
        this.router.navigateByUrl("/");
      },
      err => {
        this.isSubmitting = false;
        const errorMessage = "message" in err ? err.message : err;
        alert(errorMessage);
        this.errors = err;
      }
    );
  }
}
