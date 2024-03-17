import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { DataService } from '../data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  parent: string = ""; // parent component path name

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService) {
  }

  ngOnInit() {
    this.route.url.subscribe(([url]) => {
      const { path, parameters } = url;
      this.parent = path;
    });
  }

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
