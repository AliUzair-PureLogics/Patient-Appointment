import { Component, Input } from "@angular/core";

import { Errors } from "../data.service";

@Component({
  selector: "app-list-errors",
  templateUrl: "./list-errors.component.html"
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = [];
    if (errorList.errors) {
      for (let field in errorList.errors) {
        if (field) {
          this.formattedErrors.push(`${field} ${errorList.errors[field]}`);
          field = field;
        }
      }
    }
  }

  get errorList() {
    return this.formattedErrors;
  }
}
