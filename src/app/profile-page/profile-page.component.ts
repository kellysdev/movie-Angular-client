import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { FetchApiDataService } from "../fetch-api-data.service";
import { DataService } from "../data.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrl: "./profile-page.component.scss"
})
export class ProfilePageComponent implements OnInit {
  userDetails: any = {}; // user object
  favoriteMovies: any[] = []; // favorite movie objects
  public updateUserForm: FormGroup|any; // declare formGroup

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService,
    public dataService: DataService ) {  
  }

  ngOnInit(): void { 
    this.initializeForm();
    this.getUser();
    this.getMovies();
  }

  // initialize the formGroup when the component initializes
  initializeForm(): any {
    this.updateUserForm = new FormGroup({
      Username: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z0-9]")]),
      Password: new FormControl("", Validators.required),
      Email: new FormControl("", [Validators.required, Validators.email]),
      Birthday: new FormControl("", Validators.required),
    });
  }

  // retrieve username from storage and use to fetch and set userDetails
  // retrive array of favorite movie ids from user object
  getUser(): void {
    const username = this.dataService.getUsername();
    this.fetchApiData.getSingleUser(username).subscribe((resp: any) => {
      this.userDetails = resp;
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
    // send current username of logged in user
    let username: string = this.userDetails.Username;

    // data from form = newUserDetails
    let newUserDetails = this.updateUserForm.value;

    // make PUT API request and handle response
    this.fetchApiData.updateUser(newUserDetails, username).subscribe({
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

}