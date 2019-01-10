import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private BASE_URL = "http://localhost:3000/api";

  users = [
    // {
    //   id: 1,
    //   name: "Ahsen",
    //   address: "purelogics"
    // },
    // {
    //   id: 2,
    //   name: "Abdul",
    //   address: "curelogics"
    // },
    // {
    //   id: 3,
    //   name: "Shahzaib",
    //   address: "surelogics"
    // },
    // {
    //   id: 4,
    //   name: "Ali",
    //   address: "yourlogics"
    // },
  ];

  bookings = [
    
    {
      id: 1, 
      patientName: 'Mehboob',
      appointmentTime: '09-10-2020'
    },
    {
      id: 2, 
      patientName: 'Raza',
      appointmentTime: '09-10-2021'
    },
    {
      id: 3, 
      patientName: 'Ali',
      appointmentTime: '09-10-2022'
    }
  ];

  constructor(private http: HttpClient,
              private route: Router,) { 
                
             this.http.get(this.BASE_URL + '/allusers').subscribe( (res: any) => {
                  this.users = res;
              }, (error) => console.log(error) );
            }

  roles = ["User", "admin"];

  
  createAdmin(obj) {
    const uri = this.BASE_URL + '/signup';
    // const obj = {
    //   name: name,
    //   price: price
    // };
    return this.http.post(uri, obj);
    // let id = Math.random();
    // this.users.push({id, name, address});
    // this.route.navigate(['/index']);

  }

  editUser(id) {
    // const uri = 'http://localhost:4000/coins/edit/' + id;
    // return this
    //         .http
    //         .get(uri)
    //         .map(res => {
    //           return res;
    //         });
    const user = this.users.find(
      (s) => {
        return s._id === id;
      }
    );

    return user;
  }

  updateUser(name, address, id) {
    // const uri = 'http://localhost:4000/coins/update/' + id;

    // const obj = {
    //   name: name,
    //   price: price
    // };
    // this
    //   .http
    //   .post(uri, obj)
    //   .subscribe(res => console.log('Done'));
    
  }

  deleteUser(id) {
    // const uri = 'http://localhost:4000/coins/delete/' + id;

    //     return this
    //         .http
    //         .get(uri)
    //         .map(res => {
    //           return res;
    //         });
    const uri = this.BASE_URL + '/delete/'+ id+'/1';

    return this
        .http
        .delete(uri);
  
  }

  viewUsers() {
    const uri = this.BASE_URL + '/allusers';

    return this
        .http
        .get(uri);
  }

  viewDoctors() {
    const uri = this.BASE_URL + '/alldoctors';

    return this
        .http
        .get(uri);
  }

  viewBookings() {
    const uri = this.BASE_URL + '/allusers';

    return this
        .http
        .get(uri);
  }

  editBooking(id) {
    const booking = this.bookings.find(
      (s) => {
        return s.id === id;
      }
    );

    return booking;
  }

  updateBooking(name, time, id) {
    console.log(name);
    const booking = this.bookings.find(
      (s) => {
        return s.id === id;
      }
    );

    this.bookings = this.bookings.map(
      (data) => {
        if(data.id===id) {
          const newObj = {...data}
          newObj.patientName = name;
          newObj.appointmentTime = time;
          console.log(newObj);
          
          return newObj;
        }
        return data;
      }
    )

    console.log(this.bookings);
    

    // return booking;
  }

}
