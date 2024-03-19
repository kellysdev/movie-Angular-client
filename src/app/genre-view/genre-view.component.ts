import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-genre-view",
  templateUrl: "./genre-view.component.html",
  styleUrl: "./genre-view.component.scss"
})
export class GenreViewComponent implements OnInit {
  Genre: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /** Receives genre data from Movie Card parent component. */
  ngOnInit(): void {
    this.Genre = this.data.Genre;
  }
}
