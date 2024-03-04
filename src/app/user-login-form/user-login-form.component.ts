import { Component, OnInit, Input } from "@angular/core";

// will close the dialog on success
import { MatDialogRef } from "@angular/material/dialog";

// display notifications to the user
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
}
