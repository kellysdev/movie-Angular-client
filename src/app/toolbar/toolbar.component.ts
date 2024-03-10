import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  constructor(private router: Router) { }

  goToProfile(): void {
    this.router.navigate(["profile"]);
  }
  
  goToMovies(): void {
    this.router.navigate(["movies"]);
  }

}
