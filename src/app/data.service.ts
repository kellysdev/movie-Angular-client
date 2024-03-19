import { Injectable } from "@angular/core";

/** @groupDescription DataServices */
@Injectable({
  providedIn: "root"
})
export class DataService {

  constructor() { }

  /** @DataService Set username in localStorage */
  setUsername(username: string): void {
    localStorage.setItem("username", username);
  }

  /** @DataService Get username from localStorage */
  getUsername(): any {
    const username = localStorage.getItem("username");
    return username;
  }

  /** @DataService Clear username and token from localStorage */
  logout(): void {
    localStorage.clear();
  }
}