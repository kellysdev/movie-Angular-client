import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-director-view",
  templateUrl: "./director-view.component.html",
  styleUrl: "./director-view.component.scss"
})
export class DirectorViewComponent implements OnInit {
  Director: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
   ) { }

  /** Receives director data from Movie Card parent component. */
  ngOnInit(): void { 
    this.Director = this.data.Director;
   }

}