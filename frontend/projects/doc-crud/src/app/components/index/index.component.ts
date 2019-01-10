import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private service: UserService) { }
  users = [];
  doctors = [];
  ngOnInit() {
    this.service.viewUsers()
      .subscribe(
        (response: any) => {
          this.users = response;
        }, (error) => console.log(error)
      );

    this.service.viewDoctors()
    .subscribe(
      (response: any) => {
        // console.log(response);
      }, (error) => console.log(error)
    );
  }

  deleteUser(id) {
    this.service.deleteUser(id)
        .subscribe(res => {
            this.users = this.users.filter((data)=>{
            return data._id != id;
          });
        }, (error) => console.log(error)
      );
    
  }

}
