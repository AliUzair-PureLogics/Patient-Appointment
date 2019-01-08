import { Component, OnInit, Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { DataService, Errors } from "../data.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  authType: String = "";
  title: String = "";
  errors: Errors = new Errors();
  isSubmitting = false;
  authForm: FormGroup;
  isAuthenticated;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: DataService
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = this.authType === "login" ? "Sign In" : "Sign Up";
      // add form control for username if this is the register page
      if (this.authType === "register") {
        this.authForm.addControl(
          "username",
          new FormControl("", Validators.required)
        );
      }
    });
    this.userService.isAuthenticated.subscribe(
      res => (this.isAuthenticated = res)
    );
    if (this.isAuthenticated) {
      // redirect to login
      this.router.navigate(['']);
    }
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();

    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      data => {
        this.router.navigateByUrl("/");
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
