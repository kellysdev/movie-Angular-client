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
  userDetails: any = {}; // user object
  favoriteMovieIds: string[] = []; // array of favorite movie id's from user object
  movies: object[] = []; // all movies
  favoriteMovies: any = []; // favorite movie objects

  @Input() movie = {
    _id: "",
    Title: "",
    Description: "",
    Genre: {
      Name: "",
      Description: ""
    },
    Director: {
      Name: "",
      Bio: "",
      Birth: "",
      Death: ""
    },
    ImagePath: "",
    Featured: false,
    Actors: [],
    ReleaseDate: ""
  };

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
      this.getFavoriteMovies();
      // return this.userDetails
    })
  }

  getMovies(): void {
    // fetch movies
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // return this.movies;
    })
  }

  getFavoriteMovies(): void {
    // return an array of objects that contains a movie object for each movie id string in the favoriteMovieIds array
    this.favoriteMovies = this.favoriteMovieIds.map(favoriteMovieId => {
      return this.movies.find(movie => this.movie._id === favoriteMovieId);
    })
  }

}
