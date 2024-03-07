import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrl: "./profile-page.component.scss"
})
export class ProfilePageComponent {
  userDetails: any = {};
  favoriteMovies: any = [];

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService) {  
  }

  ngOnInit(): void { 
    this.getUser();
  }

  // the user in localStorage is null,
  // appears as [object Object] in Chrome Dev Tools Application tab under Local Storage
  // I am also getting an error that localStorage is not defined
  getUser(): Promise<any> {
    const storedUser: any = localStorage.getItem("user");
    const username = JSON.stringify(storedUser.Username);
    this.fetchApiData.getSingleUser(username).subscribe((resp: any) => {
      this.userDetails = resp;
      return this.userDetails;
      console.log(this.userDetails);
    })

    this.favoriteMovies = this.userDetails.FavoriteMovies;
    console.log(this.favoriteMovies);
    return this.userDetails, this.favoriteMovies;
  }

}
