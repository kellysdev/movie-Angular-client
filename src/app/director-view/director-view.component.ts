import { Component, Input } from "@angular/core";

@Component({
  selector: "app-director-view",
  templateUrl: "./director-view.component.html",
  styleUrl: "./director-view.component.scss"
})
export class DirectorViewComponent {
  @Input() director = {
    Name: ",",
    Birth: "",
    Death: "",
    Bio: ""
  };

  constructor( ) { }

  ngOnInit(): void { }
}
