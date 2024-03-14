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

  // determine whether this movie is in the favorite movies array
  isMovieInFavorites() {
    this.isThisAFavorite = this.favoriteMovies.includes(this.movie._id);
  }

  // open Director dialog and pass Director data to DirectorView component
  openDirectorDialog() {
    this.dialogConfig.data = {
      Director: this.movie.Director
    };
    this.dialog.open(DirectorViewComponent, this.dialogConfig);
  }

  // open Genre dialog and pass Genre data to GenreView component
  openGenreDialog() {
    this.dialogConfig.data = {
      Genre: this.movie.Genre
    };
    this.dialog.open(GenreViewComponent, this.dialogConfig);
  }

  // open movie Synopsis dialog and pass movie data to SynopsisView component
  openSynopsisDialog() {
    this.dialogConfig.data = {
      Synopsis: this.movie
    };
    this.dialog.open(SynopsisViewComponent, this.dialogConfig);
  }

  // add a movie to this users list of favorite movies
  addToFavorites() {
    this.fetchApiData.addFavoriteMovie(this.movie._id, this.userDetails).subscribe({
      next: (result => {
        this.isThisAFavorite = true;
        this.snackBar.open(this.movie.Title, "Added to Favorite Movies", {
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

}