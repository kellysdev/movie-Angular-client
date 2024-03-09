import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrl: "./profile-page.component.scss"
})
export class ProfilePageComponent implements OnInit {
  userDetails: any = {};
  favoriteMovies: any = [];

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService) {  
  }

  ngOnInit(): void { 
    this.getUser();
  }

  // the username in localStorage is reading as null, in the console it is a string
  // receiving error in the console that localStorage is not defined
  getUser(): Promise<any> {
    const username: any = localStorage.getItem("username");
    this.fetchApiData.getSingleUser(username).subscribe((resp: any) => {
      this.userDetails = resp;
      console.log(this.userDetails);
      return this.userDetails;
    })

    this.favoriteMovies = this.userDetails.FavoriteMovies;
    console.log(this.favoriteMovies);
    return this.userDetails, this.favoriteMovies;
  }

}
