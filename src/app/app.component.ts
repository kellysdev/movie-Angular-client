import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UserRegistrationFormComponent } from "./user-registration-form/user-registration-form.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent {
  title = "movie-Angular-client";

  constructor(
    public dialog: MatDialog, 
    public snackBar: MatSnackBar) { }

  // open dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // assign the dialog width
      width: "280px"
    });
  }
}
