import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataService {

  constructor() { }

  // set Username in localStorage
  setUsername(username: string): void {
    localStorage.setItem("username", username);
  }

  // retrieve Username from localStorage
  getUsername(): any {
    const username = localStorage.getItem("username");
    return username;
  }

  // logout: remove Username and token from localStorage
  logout(): void {
    localStorage.clear();
  }
}