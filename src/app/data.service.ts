import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataService {

  constructor() { }
  
  // retrieve Username from localStorage
  getUsername(): string | null {
    const username = localStorage.getItem("username");
    return username ? JSON.parse(username) : null;
  }
}