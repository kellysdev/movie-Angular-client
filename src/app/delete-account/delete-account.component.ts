import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { MAT_DIALOG_DATA } from "@angular/material/dialog";
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public fetchApiData: FetchApiDataService,
    public dataService: DataService,
    public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // accept username data from ProfilePage component
    this.username = this.data.username;
    console.log(this.username);
  }

  // when the delete account button is clicked, delete the users account
  // this will log them out and send them back to the welcome page
  deleteAccount(): void {
    this.fetchApiData.deleteUser(this.username).subscribe({
      next: (result => {
        console.log(result);
        this.dataService.logout()
        this.router.navigate(["welcome"]);
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
