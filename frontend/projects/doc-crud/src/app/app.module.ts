import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ModuleWithProviders } from "@angular/core";
// import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { CreateComponent } from "./components/create/create.component";
import { EditComponent } from "./components/edit/edit.component";
import { IndexComponent } from "./components/index/index.component";
import { appRoutes } from "./routerConfig";
import { UserService } from "./user.service";
import { DoctorsComponent } from "./components/doctors/doctors.component";
import { BookingsComponent } from "./components/bookings/bookings.component";
import { EditBookingComponent } from "./components/bookings/edit-booking/edit-booking.component";

const providers = [];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CreateComponent,
    EditComponent,
    DoctorsComponent,
    BookingsComponent,
    EditBookingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    // AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class DocCrudAppModule {}
