import { Component, OnInit, Input } from "@angular/core"

import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: "app-user-registration-form",
  templateUrl: "./user-registration-form.component.html",
  styleUrl: "./user-registration-form.component.scss"
})
export class UserRegistrationFormComponent implements OnInit {
  /** Data from inputs in form are saved to userData object */
  @Input() userData = { Username: "", Password: "", Email: "", Birthday: ""};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  /**
   * @function
   * @param {object} userData
   * @returns User data is sent to the database.
   * @throws {Error} SnackBar notifies user if there was an error.
   * @throws {Error} fetchApiDataService error handler will console log error details.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close();  // this closes the modal on success
      this.snackBar.open("Success!", "OK", {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open("Something went wrong.", "Try again.", {
        duration: 2000
      });
    });
  }
  
}
