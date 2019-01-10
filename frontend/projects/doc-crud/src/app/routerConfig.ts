// routerConfig.ts

import { Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { IndexComponent } from './components/index/index.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { EditBookingComponent } from './components/bookings/edit-booking/edit-booking.component';

export const appRoutes: Routes = [
  { 
    path: '',
    component: IndexComponent,
    pathMatch: 'full'
  },
  { 
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  { 
    path: 'index',
    component: IndexComponent
  },
  { 
    path: 'doctors',
    component: DoctorsComponent
  },
  { 
    path: 'bookings',
    component: BookingsComponent
  },
  { 
    path: 'bookings/:id/edit', 
    component: EditBookingComponent
  }
];
