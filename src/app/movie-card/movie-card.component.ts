import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { FetchApiDataService } from "../fetch-api-data.service";
import { DataService } from "../data.service";

import { DirectorViewComponent } from "../director-view/director-view.component";
import { GenreViewComponent } from "../genre-view/genre-view.component";
import { SynopsisViewComponent } from "../synopsis-view/synopsis-view.component";

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
  isThisAFavorite: boolean = false; // is this movie in the favoriteMovies array

  /** Receives movie data from Main View parent component. */
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
    // fetch user and set user, username and favoriteMovies
    const username: string = this.dataService.getUsername();
    this.fetchApiData.getSingleUser(username).subscribe((resp: any) => {
      this.userDetails = resp;
      this.username = resp.Username;
      this.favoriteMovies = resp.FavoriteMovies || [];
      this.isMovieInFavorites();
    })
    
  }

  /**
   * @function
   * @namme isMovieInFavorites
   * @returns {boolean}
   * @description Determines whether the movie for this movie card is in the favorite movies array.
   */
  isMovieInFavorites() {
    this.isThisAFavorite = this.favoriteMovies.includes(this.movie._id);
  }

  /** Open dialog that contains Director View component and pass director data to it. */
  openDirectorDialog() {
    this.dialogConfig.data = {
      Director: this.movie.Director
    };
    this.dialog.open(DirectorViewComponent, this.dialogConfig);
  }

  /** Open dialog that contains Genre View component and pass genre data to it. */
  openGenreDialog() {
    this.dialogConfig.data = {
      Genre: this.movie.Genre
    };
    this.dialog.open(GenreViewComponent, this.dialogConfig);
  }

  /** Open dialog that contains Synopsis View componen and pass movie data to it. */
  openSynopsisDialog() {
    this.dialogConfig.data = {
      Synopsis: this.movie
    };
    this.dialog.open(SynopsisViewComponent, this.dialogConfig);
  }

  /**
   * @function
   * @name addToFavorites
   * @param {string} this.movie._id
   * @param {object} userDetails
   * @returns {boolean} isThisAFavorite
   * @throws {Error} SnackBar alerts user if there was an error and console logs the error.
   * @throws {Error} fetchApiDataService error handler will console log error details.
   */
  addToFavorites() {
    this.fetchApiData.addFavoriteMovie(this.movie._id, this.userDetails).subscribe({
      next: (result => {
        this.isThisAFavorite = true;
        this.snackBar.open("Added to Favorite Movies", "OK", {
          duration: 2000
        });
      }),
      error: (error) => {
        console.log("Error adding to favorites:", error);
        this.snackBar.open("An error occurred wile adding to favorites", "OK", {
          duration: 2000
        });
      }
    });
  }

    /**
   * @function
   * @name removeFromFavorites
   * @param {string} this.movie._id
   * @param {object} userDetails
   * @returns {boolean} isThisAFavorite
   * @throws {Error} SnackBar alerts user if there was an error and console logs the error.
   * @throws {Error} fetchApiDataService error handler will console log error details.
   */
  removeFromFavorites() {
    this.fetchApiData.removeFavoriteMovie(this.movie._id, this.userDetails).subscribe({
      next: (result => {
        this.isThisAFavorite = false;
        this.snackBar.open("Removed from Favorite Movies", "OK", {
          duration: 2000
        });
      }),
      error: (error) => {
        console.log("Error removing from favorites:", error);
        this.snackBar.open("An error occurred.", "OK", {
          duration: 2000
        });
      }
    });
  }

}