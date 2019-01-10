import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../user.service';
import { FormGroup,  FormControl,  Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  paramsSubscription: Subscription;

  user: any;
  addForm: FormGroup;
  title = 'Edit User';
  constructor(private route: ActivatedRoute, private router: Router, private service: UserService) {
   }

   


  updateUser(name, address) {
      this.route.params.subscribe(params => {
      this.service.updateUser(name, address, params['id']);
      this.router.navigate(['index']);
    });
  }

  

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.doctor = this.service.editDoctor(params['id']).subscribe(res => {
    //     this.doctor = res;
    //   });
    // });
    
    this.paramsSubscription = this.route.params
    .subscribe(
      (params: Params) => {
        this.user = this.service.editUser(params['id']);
        // console.log(this.user);
      }
    );

    this.addForm = new FormGroup({
      "name": new FormControl(this.user.name, Validators.required),
      "username": new FormControl(this.user.username, Validators.required),
      "password": new FormControl(null, Validators.required),
      
    });

  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
