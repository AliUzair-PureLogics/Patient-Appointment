import { BrowserModule } from "@angular/platform-browser";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { ListErrorsComponent } from "./shared/list-errors.component";

import { DataService } from "./data.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListErrorsComponent
  ],
  exports: [ListErrorsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
