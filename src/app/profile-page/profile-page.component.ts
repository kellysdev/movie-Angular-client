import { Component, OnInit } from "@angular/core";
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
  getUser(): Promise<any> {
    const storedUsername = this.dataService.getUsername;
    const username = storedUsername();
    console.log(username);
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
