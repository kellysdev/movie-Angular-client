import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-synopsis-view",
  templateUrl: "./synopsis-view.component.html",
  styleUrl: "./synopsis-view.component.scss"
})
export class SynopsisViewComponent implements OnInit {
  Synopsis: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /** Receives movie data from Movie Card parent component. */
  ngOnInit(): void {
    // pass the data from MovieCard to this component's Synopsis variable
    this.Synopsis = this.data.Synopsis;
  }
}