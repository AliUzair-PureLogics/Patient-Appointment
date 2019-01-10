import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookings = [];

  constructor(private service: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.bookings = this.service.bookings;
  }

  onEditBooking(id: number) {
    // console.log('hello');
    this.router.navigate( [+id, 'edit'] , { relativeTo: this.route} );
  }

  onDeleteBooking(id: number) {
    
    console.log(id);
            this.bookings = this.bookings.filter((data)=>{
            return data.id != id;
          }
        
      );
    
  }

}
