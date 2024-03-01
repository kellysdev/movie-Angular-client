import { Injectable } from "@angular/core";
import { catchError } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

// Declare the api url that will provide data for the client app
const apiUrl = "https://popopolis-f7a904c7cad0.herokuapp.com/";

@Injectable({
  providedIn: "root"
})
export class UserRegistrationService {

  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occured:", error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      "Something bad happened; please try again later."
    );
  };

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  };

  // api calls:

  // user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + "users", userDetails).pipe(
      catchError(this.handleError)
    );
  };

  // user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    let userUsername = userDetails.Username;
    let userPassword = userDetails.Password;
    console.log(userDetails);
    return this.http.post(apiUrl + "login?Username=" + userUsername + "&Password=" + userPassword, userDetails).pipe(
      catchError(this.handleError)
    );
  };

  // get all movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get<any>(apiUrl + "movies", {headers: new HttpHeaders(
      { Authorization: "Bearer " + token, }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  // return a single movie endpoint
  // will pass the title of the movie clicked on
  getSingleMovie(title: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get<any>(apiUrl + "movies" + title, {headers: new HttpHeaders(
      {Authorization: "Bearer " + token, }
    )}).pipe(
      catchError(this.handleError)
    );
  };

};