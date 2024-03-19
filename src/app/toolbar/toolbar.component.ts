import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { DataService } from '../data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  /** @description Conditionally renders a button to navigate to movies or to profile depending on what page(parent component) you are currently on. */
  parent: string = ""; // parent component path name

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService) {
  }

  /** @description Determines what the parent component is by the url. */
  ngOnInit() {
    this.route.url.subscribe(([url]) => {
      const { path, parameters } = url;
      this.parent = path;
    });
  }

  /**
   * @function
   * @name goToProfile
   * @fires Router#NavigateToProfile
   * @description Navigates to the profile page when this button icon is clicked.
   */
  goToProfile(): void {
    this.router.navigate(["profile"]);
  }
  
  /** 
   * @function
   * @name goToMovies
   * @fires Router#NavigateToMovies
   * @description Navigates to the movies page when the button icon linked to this method is clicked.
   */
  goToMovies(): void {
    this.router.navigate(["movies"]);
  }

  /**
   * @function
   * @name logout
   * @fires dataService#logout
   * @fires Router#NavigateToWelcome
   * @description Clears username and token from localStorage and redirects back to welcome page.
   */
  logout(): void {
    this.dataService.logout();
    this.router.navigate(["welcome"]);
  }

}
