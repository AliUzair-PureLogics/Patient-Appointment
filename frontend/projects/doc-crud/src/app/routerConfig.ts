// routerConfig.ts

import { Routes } from "@angular/router";
import { CreateComponent } from "./components/create/create.component";
import { EditComponent } from "./components/edit/edit.component";
import { IndexComponent } from "./components/index/index.component";
import { DoctorsComponent } from "./components/doctors/doctors.component";
import { BookingsComponent } from "./components/bookings/bookings.component";
import { EditBookingComponent } from "./components/bookings/edit-booking/edit-booking.component";

export const appRoutes: Routes = [
  {
    path: "admin",
    component: IndexComponent,
    pathMatch: "full"
  },
  {
    path: "admin/create",
    component: CreateComponent
  },
  {
    path: "admin/edit/:id",
    component: EditComponent
  },
  {
    path: "admin/index",
    component: IndexComponent
  },
  {
    path: "admin/doctors",
    component: DoctorsComponent
  },
  {
    path: "admin/bookings",
    component: BookingsComponent
  },
  {
    path: "admin/bookings/:id/edit",
    component: EditBookingComponent
  }
];
