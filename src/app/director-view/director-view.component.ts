import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-director-view",
  templateUrl: "./director-view.component.html",
  styleUrl: "./director-view.component.scss"
})
export class DirectorViewComponent implements OnInit {
  Director: object;

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
    @Inject(MAT_DIALOG_DATA) data: {Director: any}
   ) { 
    this.Director = this.movie.Director;
   }

  ngOnInit(): void { }
}