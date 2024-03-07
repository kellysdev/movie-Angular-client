import { Component } from "@angular/core";

import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrl: "./movie-card.component.scss"
})
export class MovieCardComponent {

  constructor (
    public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    
  }


}