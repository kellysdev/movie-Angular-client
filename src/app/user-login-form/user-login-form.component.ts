import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { FetchApiDataService } from "../fetch-api-data.service";
import { DataService } from "../data.service";

@Component({
  selector: "app-user-login-form",
  templateUrl: "./user-login-form.component.html",
  styleUrl: "./user-login-form.component.scss"
})
export class UserLoginFormComponent implements OnInit {
  /** Data from inputs in form are saved to userData object */
 @Input() userData = { Username: "", Password: "" };

 constructor(
  private router: Router,
  public fetchApiData: FetchApiDataService,
  public dataService: DataService,
  public dialogRef: MatDialogRef<UserLoginFormComponent>,
  public snackBar: MatSnackBar ) { }

  ngOnInit(): void { }

  /**
   * @function
   * @name loginUser
   * @param {object} userData
   * @returns Username and token are stored in localStorage.
   * @fires Router#NavigateToMoviesPage
   * @throws {Error} SnackBar notifies user if there was an error.
   * @throws {Error} fetchApiDataService error handler will console log error details.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      if (result.user) {
        const username = JSON.stringify(result.user.Username);
        this.dataService.setUsername(JSON.parse(username));
        localStorage.setItem("token", result.token);
        this.dialogRef.close(); // closes modal on success
        // snackbar alerts user
        this.snackBar.open("Login successful!", "OK", {
          duration: 2000
        });
        this.router.navigate(["movies"]);
      } else {
        this.snackBar.open("Something went wrong.", "Try again.", {
          duration: 2000
        });
      }
    });
  }

}