import { Genre } from "./genre.model";
import { Director } from "./director.model";

export interface Movie {
  _id: string;
  Title: string;
  Description: string;
  Genre: Genre;
  Director: Director;
  ImagePath: string;
  Featured: boolean;
  Actors: string[];
  ReleaseDate: string;
}