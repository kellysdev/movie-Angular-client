import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.scss"
})
export class UserProfileComponent {
  userDetails: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService) {  
  }

  ngOnInit(): void { 
    this.getUser();
  }

  getUser(): void {
    this.userDetails = JSON.parse(localStorage.getItem("user"));
    console.log(this.userDetails);
    
    this.fetchApiData.getUserFavoriteMovies(this.userDetails).subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    })
  }

}
