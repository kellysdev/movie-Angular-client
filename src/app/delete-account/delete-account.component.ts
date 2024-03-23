import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { FetchApiDataService } from "../fetch-api-data.service";
import { DataService } from "../data.service";

@Component({
  selector: "app-delete-account",
  templateUrl: "./delete-account.component.html",
  styleUrl: "./delete-account.component.scss"
})
export class DeleteAccountComponent implements OnInit{
  username: string = "";
  isUserGuest: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public fetchApiData: FetchApiDataService,
    public dataService: DataService,
    public dialogRef: MatDialogRef<DeleteAccountComponent>,
    public snackBar: MatSnackBar) {
  }

  /** Receives user data from Profile Page parent component. */
  ngOnInit(): void {
    this.username = this.data.username;
    if (this.username === "guest") {
      this.isUserGuest = true;
    } else {
      this.isUserGuest = false;
    }
  }

  /**
   * @function
   * @name deleteAccount
   * @param {string} Username
   * @fires Router#NavigateToWelcome
   * @throws {Error} SnackBar alerts user if there was an error and console logs it.
   * @throws {Error} fetchApiDataService error handler will console log error details.
   * @description Deletes the user account when the delete account button is clicked.  On success, the dialog closes and the user is redirected to the welcome page.
   */
  // when the delete account button is clicked, delete the users account
  // this will log them out and send them back to the welcome page
  deleteAccount(): void {
    this.fetchApiData.deleteUser(this.username).subscribe({
      next: (result => {
        if (this.isUserGuest) {
          this.snackBar.open("Cannot delete guest.", "OK", {
            duration: 2000
          });
        } else {
          console.log(result);
          this.dataService.logout()
          this.dialogRef.close();
          this.router.navigate(["welcome"]);
        }
      }),
      error: (error) => {
        console.log("Delete user error:", error);
        this.snackBar.open("Something went wrong.", "Try again", {
          duration: 2000
        });
      }
    });
  }
}
