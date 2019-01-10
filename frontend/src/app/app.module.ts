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

import {DocCrudAppModule} from "../../projects/doc-crud/src/app/app.module";
import {DocAppAppModule} from "../../projects/docapp/src/app/app.module";

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
    DocAppAppModule,
    DocCrudAppModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
