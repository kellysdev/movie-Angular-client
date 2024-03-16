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
  public updateUserForm: FormGroup|any;

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
    this.fetchApiData.updateUser(this.userDetails).subscribe((resp: any) => {
      if (!Error) {
        this.userDetails = resp;
        this.snackBar.open("Success!", "OK", {
          duration: 2000
        });
      } else {
        console.log("User update error:", Error);
        this.snackBar.open("Something went wrong.", "Try again", {
          duration: 2000
        });
      }
    });
  }

}