import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

// import backend API
import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: "app-user-login-form",
  templateUrl: "./user-login-form.component.html",
  styleUrl: "./user-login-form.component.scss"
})
export class UserLoginFormComponent implements OnInit {
 @Input() userData = { Username: "", Password: "" };

 constructor(
  private router: Router,
  public fetchApiData: FetchApiDataService,
  public dialogRef: MatDialogRef<UserLoginFormComponent>,
  public snackBar: MatSnackBar ) { }

  ngOnInit(): void { }

  // call login function from API service
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        this.dialogRef.close(); // closes modal on success
        // snackbar alerts user
        this.snackBar.open(result, "Login successful", {
          duration: 2000
        });
        this.router.navigate(["movies"]);
      } else {
        this.snackBar.open(result, "Something went wrong", {
          duration: 2000
        });
      }
    });
  }

}