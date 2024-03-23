import { Component, OnInit } from "@angular/core";
import { FormControl, FormBuilder, Validators, FormGroup } from "@angular/forms";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { DeleteAccountComponent } from "../delete-account/delete-account.component";

import { FetchApiDataService } from "../fetch-api-data.service";
import { DataService } from "../data.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"]
})
export class ProfilePageComponent implements OnInit {
  dialogConfig = new MatDialogConfig();
  userDetails: any = {}; // user object
  username: string = ""; // user username
  favoriteMovies: any[] = []; // favorite movie objects
  updateUserForm: FormGroup;
  isUserGuest: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService,
    public dataService: DataService ) {
      this.updateUserForm = this.fb.group({
        Username: new FormControl({value: "guest", disabled: true}, [Validators.required, Validators.pattern("[a-zA-Z0-9]"), Validators.minLength(3)]),
        Password: new FormControl({value: "guest", disabled: true}, Validators.required),
        Email: new FormControl({value: "guest", disabled: true}, [Validators.required, Validators.email]),
        Birthday: new FormControl({value: "guest", disabled: true}, Validators.required),
      });
  }

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
  }

  /**
   * @function
   * @name getUser
   * @returns {object} User object
   * @returns {string} Username
   * @description Retrieves the username from localStorage and uses it to fetch the most recent user object data.
   * 
   */
  getUser(): void {
    const username = this.dataService.getUsername();
    this.fetchApiData.getSingleUser(username).subscribe((resp: any) => {
      this.userDetails = resp;
      this.username = this.userDetails.Username;
      if (this.username === "guest") {
        this.isUserGuest = true;
      } else {
        this.isUserGuest = false;
      }
    });
  }

  /**
   * @function
   * @name getMovies
   * @returns {array{}}
   * @description Fetches all movies but only returns movies that have an id that matches the ids in the user's favorite movies array.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((m: {_id: any}) => this.userDetails.FavoriteMovies.indexOf(m._id) >= 0);
    });
  }

  /**
   * @function
   * @name updateUserInfo
   * @param {object} newUserDetails from form inputs.
   * @returns {object} Updated user object.
   * @returns Sets new username in localStorage.
   * @throws {Error} Console logs error.
   * @throws {Error} SnackBar alerts user if there was an error.
   */
  updateUserInfo(): void {
    // data from form = newUserDetails
    let newUserDetails = this.updateUserForm.value;

    // make PUT API request and handle response
    this.fetchApiData.updateUser(newUserDetails, this.username).subscribe({
      next: (result => {
        this.userDetails = result;
        this.dataService.setUsername(this.userDetails.Username);
        this.snackBar.open("Success!", "OK", {
          duration: 2000
        });
      }),
      error: (error) => {
        console.log("User update error:", error);
        if (this.username === "guest") {
          this.snackBar.open("Cannot edit guest account.", "OK", {
            duration: 2000
          })
        } else {
          this.snackBar.open("Something went wrong.", "Try again", {
            duration: 2000
          });
        }
      }
    });
  }

  /** Opens a dialog that contains Delete Account component. */
  openConfirmDeleteDialog(): void {
    this.dialogConfig.data = {
      username: this.username
    }
    this.dialog.open(DeleteAccountComponent, this.dialogConfig);
  }

}