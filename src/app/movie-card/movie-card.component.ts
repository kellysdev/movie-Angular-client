import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { FetchApiDataService } from "../fetch-api-data.service";
import { DirectorViewComponent } from "../director-view/director-view.component";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrl: "./movie-card.component.scss"
})
export class MovieCardComponent {
  dialogConfig = new MatDialogConfig();

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
    public dialog: MatDialog) { }

  ngOnInit(): void { }

  // open Director dialog and pass Director data to DirectorView component
  openDirectorDialog() {
    this.dialogConfig.data = {
      Director: this.movie.Director
    };
    this.dialog.open(DirectorViewComponent, this.dialogConfig);
    console.log(this.dialogConfig.data);
  }

}