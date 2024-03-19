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

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: "280px"
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: "280px"
    });
  }

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
