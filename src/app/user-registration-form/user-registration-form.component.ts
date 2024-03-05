import { Component, OnInit, Input } from "@angular/core";

// to close the dialog on success
import { MatDialogRef } from "@angular/material/dialog";

// import API calls
import { FetchApiDataService } from "../fetch-api-data.service";

// display notifications to the user
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-user-registration-form",
  templateUrl: "./user-registration-form.component.html",
  styleUrl: "./user-registration-form.component.scss"
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: "", Password: "", Email: "", Birthday: ""};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  // send form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      //logic for successful user registration goes here
      this.dialogRef.close();  // this closes the modal on success
      this.snackBar.open(result, "OK", {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, "OK", {
        duration: 2000
      });
    });
  }
  
}
