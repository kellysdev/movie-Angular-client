import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { FetchApiDataService } from "../fetch-api-data.service";
import { DataService } from "../data.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrl: "./profile-page.component.scss"
})
export class ProfilePageComponent implements OnInit {
  userDetails: any = {};
  favoriteMovieIds: any = [];
  favoriteMovies: any = [];

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public dataService: DataService ) {  
  }

  ngOnInit(): void { 
    this.getUser();
  }

  // retrieve username from storage and use to fetch and set userDetails
  // retrive array of favorite movie ids from user object
  getUser(): void {
    const storedUsername = this.dataService.getUsername;
    const username = storedUsername();
    this.fetchApiData.getSingleUser(username).subscribe((resp: any) => {
      this.userDetails = resp;
      this.favoriteMovieIds = this.userDetails.FavoriteMovies;
      return this.userDetails, this.favoriteMovieIds;
    })
  }

}
