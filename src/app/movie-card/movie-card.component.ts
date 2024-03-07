import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrl: "./movie-card.component.scss"
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor (
    private router: Router,
    public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  goToProfile(): void {
    this.router.navigate(["profile"]);
  }

}
