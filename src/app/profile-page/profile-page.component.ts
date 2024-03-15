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
  userDetails: any = {}; // user object
  favoriteMovies: any[] = []; // favorite movie objects

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public dataService: DataService ) {  
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
    });
  }

  getMovies(): void {
    // fetch all movies and return only favoriteMovies
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((m: {_id: any}) => this.userDetails.FavoriteMovies.indexOf(m._id) >= 0);
    });
  }

}