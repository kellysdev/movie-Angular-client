import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { FetchApiDataService } from "../fetch-api-data.service";
import { DataService } from "../data.service";

import { DirectorViewComponent } from "../director-view/director-view.component";
import { GenreViewComponent } from "../genre-view/genre-view.component";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrl: "./movie-card.component.scss"
})
export class MovieCardComponent {
  dialogConfig = new MatDialogConfig();
  userDetails: any = {}; // user object
  username: string = ""; // userDetails.Username
  favoriteMovies: any = []; // userDetails.FavoriteMovies
  isThisAFavorite: boolean = false;

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

  constructor (
    public fetchApiData: FetchApiDataService,
    public dataService: DataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // fetch user
    const username: string = this.dataService.getUsername();
    this.fetchApiData.getSingleUser(username).subscribe((resp: any) => {
      this.userDetails = resp;
      return this.userDetails;
    })

    // set the username and favorite movies array
    this.getDetails();

    // set whether this movie is a favorite or not
    this.isMovieInFavorites();
    
  }

  // get the username and favorite movies array from the user object
  getDetails() {
    this.username = this.userDetails.Username;
    this.favoriteMovies = this.userDetails.FavoriteMovies ?
      this.userDetails.FavoriteMovies 
      : [];
    return this.username, this.favoriteMovies;
  }

  // determine whether this movie is in the favorite movies array
  isMovieInFavorites() {
    if (this.favoriteMovies.length > 0 && this.favoriteMovies.includes(this.movie)) {
      this.isThisAFavorite = true;
    }
  }

  // open Director dialog and pass Director data to DirectorView component
  openDirectorDialog() {
    this.dialogConfig.data = {
      Director: this.movie.Director
    };
    this.dialog.open(DirectorViewComponent, this.dialogConfig);
    // console.log(this.dialogConfig.data);
  }

  // open Genre dialog and pass Genre data to GenreView component
  openGenreDialog() {
    this.dialogConfig.data = {
      Genre: this.movie.Genre
    };
    this.dialog.open(GenreViewComponent, this.dialogConfig);
  }

}