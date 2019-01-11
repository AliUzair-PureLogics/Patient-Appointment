import { NgModule } from "@angular/core";
import {
  MatNativeDateModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatTabsModule,
  MatTableModule,
  MatDividerModule,
  MatRippleModule
} from "@angular/material";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatDividerModule,
    MatRippleModule
  ],

  exports: [
    MatNativeDateModule,
    FormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatDividerModule,
    MatRippleModule
  ]
})
export class MyMaterialModule {}
