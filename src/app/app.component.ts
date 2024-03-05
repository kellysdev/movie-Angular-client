import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { UserRegistrationFormComponent } from "./user-registration-form/user-registration-form.component";
import { UserLoginFormComponent } from "./user-login-form/user-login-form.component";
import { MovieCardComponent } from "./movie-card/movie-card.component";

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

  // open dialog when the login button is clicked
  openLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: "280px"
    });
  }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: "500px"
    });
  }

}
