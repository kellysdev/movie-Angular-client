import { Component, OnInit } from "@angular/core";
import { FormControl, FormBuilder, Validators, FormGroup } from "@angular/forms";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { DeleteAccountComponent } from "../delete-account/delete-account.component";

import { FetchApiDataService } from "../fetch-api-data.service";
import { DataService } from "../data.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"]
})
export class ProfilePageComponent implements OnInit {
  dialogConfig = new MatDialogConfig();
  userDetails: any = {}; // user object
  username: string = ""; // user username
  favoriteMovies: any[] = []; // favorite movie objects
  updateUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService,
    public dataService: DataService ) {
      this.updateUserForm = this.fb.group({
        Username: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z0-9]"), Validators.minLength(3)]),
        Password: new FormControl("", Validators.required),
        Email: new FormControl("", [Validators.required, Validators.email]),
        Birthday: new FormControl("", Validators.required),
      });
  }

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
  }

  // retrieve username from storage and use to fetch and set userDetails
  // retrive array of favorite movie ids from user object
  getUser(): void {
    const username = this.dataService.getUsername();
    this.fetchApiData.getSingleUser(username).subscribe((resp: any) => {
      this.userDetails = resp;
      this.username = this.userDetails.Username;
    });
  }

  getMovies(): void {
    // fetch all movies and return only favoriteMovies
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((m: {_id: any}) => this.userDetails.FavoriteMovies.indexOf(m._id) >= 0);
    });
  }

  // update user info
  updateUserInfo(): void {
    // data from form = newUserDetails
    let newUserDetails = this.updateUserForm.value;

    // make PUT API request and handle response
    this.fetchApiData.updateUser(newUserDetails, this.username).subscribe({
      next: (result => {
        this.userDetails = result;
        this.dataService.setUsername(this.userDetails.Username);
        this.snackBar.open("Success!", "OK", {
          duration: 2000
        });
      }),
      error: (error) => {
        console.log("User update error:", error);
        this.snackBar.open("Something went wrong.", "Try again", {
          duration: 2000
        });
      }
    });
  }

  // open an dialog to confirm the user wants to delete their account
  openConfirmDeleteDialog(): void {
    this.dialogConfig.data = {
      username: this.username
    }
    this.dialog.open(DeleteAccountComponent, this.dialogConfig);
  }

}