import { Injectable } from "@angular/core";
import { catchError } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap } from "rxjs/operators";

// Declare the api url that will provide data for the client app
const apiUrl = "https://popopolis-f7a904c7cad0.herokuapp.com/";

@Injectable({
  providedIn: "root"
})
export class FetchApiDataService {

  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  /** Error Handling */
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

  /** @groupDescription APIcalls */

  /** @APIcall Register new user */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + "users", userDetails).pipe(
      catchError(this.handleError)
    );
  };

  /** @APIcall Login */
  public userLogin(userDetails: any): Observable<any> {
    let userUsername = userDetails.Username;
    let userPassword = userDetails.Password;
    return this.http.post(apiUrl + "login?Username=" + userUsername + "&Password=" + userPassword, userDetails).pipe(
      catchError(this.handleError)
    );
  };

  /** @APIcall Get all movies */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get<any>(apiUrl + "movies", {headers: new HttpHeaders(
      { Authorization: "Bearer " + token, }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /** @APIcall Get a single movie by title */
  getSingleMovie(title: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get<any>(apiUrl + "movies/" + title, {headers: new HttpHeaders(
      {Authorization: "Bearer " + token, }
    )}).pipe(
      catchError(this.handleError)
    );
  };

  /** @APIcall Get director information by director name */
  getDirector(director: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get<any>(apiUrl + "movies/Director/" + director, {headers: new HttpHeaders(
      {Authorization: "Bearer " + token, }
    )}).pipe(
      catchError(this.handleError)
    );
  };

  /** @APIcall Get genre information by genre name */
  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get<any>(apiUrl + "movies/Genre/" + genre, {headers: new HttpHeaders(
      {Authorization: "Bearer " + token, }
    )}).pipe(
      catchError(this.handleError)
    );
  };

  /** @APIcall Get a user object with their username */
  getSingleUser(username: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get<any>(apiUrl + "users/" + username, {headers: new HttpHeaders(
      {Authorization: "Bearer " + token,}
    )}).pipe(
      catchError(this.handleError)
    );
  };

  /** @APIcall Get the array of movie id's in the users favorite movies list */
  getUserFavoriteMovies(userDetails: any): Observable<any> {
    let userUsername = userDetails.Username;
    let favoriteMovies = userDetails.FavoriteMovies;
    const token = localStorage.getItem("token");
    return this.http.get<any>(apiUrl + "users/" + userUsername, 
      {
        headers: new HttpHeaders({Authorization: "Bearer " + token,}),
        observe: favoriteMovies
      }
    ).pipe(
      catchError(this.handleError)
    );
  };

  /** @APIcall Add a favorite movie to the users list of favorite movies */
  addFavoriteMovie(movie: string, userDetails: any): Observable<any> {
    let userUsername = userDetails.Username;
    const token = localStorage.getItem("token");
    return this.http.post(apiUrl + "users/" + userUsername + "/movies/" + movie, {}, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${token}`
      }),
      responseType: "text"
    }).pipe(
      tap(response => console.log(response)),
      catchError(this.handleError)
    );
  };

  /** @APIcall Update user information with information in form */
  updateUser(newUserDetails: any, username: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.put(apiUrl + "users/" + username, newUserDetails,
    {
      headers: new HttpHeaders({Authorization: "Bearer " + token,})
    }).pipe(
      catchError(this.handleError)
    );
  };

  /** @APIcall Delete user account */
  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.delete(apiUrl + "users/" + username, 
    {
      headers: new HttpHeaders({"Authorization": `Bearer ${token}`}),
      responseType: "text"
    }).pipe(
      catchError(this.handleError)
    );
  };

  /** @APIcall Remove a movie from the users list of favorite movies */
  removeFavoriteMovie(movie: string, userDetails: any): Observable<any> {
    let userUsername = userDetails.Username;
    const token = localStorage.getItem("token");
    return this.http.delete(apiUrl + "users/" + userUsername + "/movies/" + movie, 
    {
      headers: new HttpHeaders({Authorization: "Bearer "+ token}),
      responseType: "text"
    }).pipe(
      catchError(this.handleError)
    );
  };

};