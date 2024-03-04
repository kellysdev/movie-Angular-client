import { Component, OnInit, Input } from "@angular/core";

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

// import backend API
import { UserRegistrationService } from "../fetch-api-data.service";

@Component({
  selector: "app-user-login-form",
  templateUrl: "./user-login-form.component.html",
  styleUrl: "./user-login-form.component.scss"
})
export class UserLoginFormComponent implements OnInit {
 @Input() userData = { Username: "", Password: "" };

 constructor(
  public fetchApiData: UserRegistrationService,
  public dialogRef: MatDialogRef<UserLoginFormComponent>,
  public snackBar: MatSnackBar ) { }

  ngOnInit(): void { }

  // call login function from API service
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      let data = result.json();
      if (data.user) {
        localStorage.setItem("user", data.user);
        localStorage.setItem("token", data.token);
        this.dialogRef.close(); // closes modal on success
        // snackbar alerts user
        this.snackBar.open(result, "Login successful", {
          duration: 2000
        });
        console.log(data.user, "success");
      } else {
        console.log("Something went wrong.");
      }
    });
  }

}