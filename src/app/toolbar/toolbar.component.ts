import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { DataService } from '../data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  constructor(
    private router: Router,
    private dataService: DataService) { }

  goToProfile(): void {
    this.router.navigate(["profile"]);
  }
  
  goToMovies(): void {
    this.router.navigate(["movies"]);
  }

  logout(): void {
    this.dataService.logout();
    this.router.navigate(["welcome"]);
  }

}
