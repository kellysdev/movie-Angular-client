import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { FetchApiDataService } from "../fetch-api-data.service";
import { DataService } from "../data.service";

import { UserLoginFormComponent } from "../user-login-form/user-login-form.component";
import { UserRegistrationFormComponent } from "../user-registration-form/user-registration-form.component";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrl: "./welcome-page.component.scss"
})
export class WelcomePageComponent implements OnInit {
  // Define guest login credentials
  userData: object = {
    Username: "guest",
    Password: "guest"
  };

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public fetchApiDataService: FetchApiDataService,
    public dataService: DataService) {
  }

  ngOnInit(): void { }

  /** Opens dialog which contains User Registration Component */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: "280px"
    });
  }

  /** Opens dialog which contains User Login Form Component */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: "280px"
    });
  }

  /**
   * @function guestLogin
   * @param {object} GuestCredentials
   * @returns Token and username are stored in localStorage.
   * @fires NavigateToMoviesPage
   * @throws {Error} SnackBar will alert the user if an error was encountered.
   * @throws {Error} fetchApiDataService error handler will console log error details.
   * @description Allows a user to login without creating an account.
    */
  guestLogin() {
     this.fetchApiDataService.userLogin(this.userData).subscribe((result) => {
      if (result.user) {
        const username = JSON.stringify(result.user.Username);
        this.dataService.setUsername(JSON.parse(username));
        localStorage.setItem("token", result.token);
        this.snackBar.open("Login successful!", "OK", {
          duration: 2000
        });
        this.router.navigate(["movies"]);
      } else {
        this.snackBar.open("Something went wrong.", "Try again", {
          duration: 2000
        });
      }
     });
  }
  
}
