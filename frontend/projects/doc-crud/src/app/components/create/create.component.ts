import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  title = 'Add Admin';
  addForm: FormGroup;

  user = {
    name : '',
    username : ''
  }
  formSubmission = false;

  
  constructor(private service: UserService) {
    // this.createForm();
    this.addForm = new FormGroup({
      "name": new FormControl(null, Validators.required),
      "username": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required),
      
    });
   }
  // createForm() {
  //   this.angForm = this.fb.group({
  //     name: ['', Validators.required ],
  //     address: ['', Validators.required ]
  //  });
  // }

  roles = this.service.roles;
   
  onSubmit() {
      // this.service.addUser(name, username);
      let formObject = {...this.addForm.value};
      formObject.role = 1;
      this.service.createAdmin(formObject)
          .subscribe(
            (response: any) => {
              console.log(response);
            }, (error) => console.log(error)
          );

      this.formSubmission = true;
      this.user.name = this.addForm.value.name;
      this.user.username = this.addForm.value.username;
      this.addForm.reset();
  }
  ngOnInit() {
  }
}
