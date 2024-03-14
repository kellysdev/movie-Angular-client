import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { Movie } from "../models/movie.model";
import { FetchApiDataService } from "../fetch-api-data.service";
import { DataService } from "../data.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrl: "./profile-page.component.scss"
})
export class ProfilePageComponent implements OnInit {
  userDetails: any = {}; // user object
  favoriteMovieIds: string[] = []; // array of favorite movie id's from user object
  movies: Movie[] = []; // all movies
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
      this.favoriteMovieIds = this.userDetails.FavoriteMovies;
      console.log(this.favoriteMovieIds);
    });
  }

  getMovies(): void {
    // fetch all movies
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    })
    // clear favoriteMovies array before repopulating
    this.favoriteMovies = [];
    // map each favoriteMovieId to the corresponding movie object
    // populates an array of undefined for each item in favoriteMovieIds unless filer is applied
    this.favoriteMovies = this.favoriteMovieIds.map(favoriteMovieId => {
      return this.movies.find(movie => movie._id === favoriteMovieId);
    }).filter(movie => movie !== undefined);
    console.log(this.favoriteMovies);
  }

}